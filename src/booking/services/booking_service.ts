import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking } from '../models/booking';
import { CreateBookingDto } from '../dtos/create_booking';
import { UpdateBookingDto } from '../dtos/update_booking';
import { plainToInstance } from 'class-transformer';
import { BookingResponseDto } from '../dtos/booking_response';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<Booking>,
  ) {}

  async create(userId: string, dto: CreateBookingDto) {
    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);

    if (startTime >= endTime) {
      throw new ForbiddenException('End time must be after start time');
    }

    await this.checkTimeOverlap(startTime, endTime);

    const booking = await this.bookingModel.create({
      ...dto,
      startTime,
      endTime,
      status: dto.status || 'pending',
      userId,
    });

    return plainToInstance(
      BookingResponseDto,
      {
        id: booking._id.toString(),
        ...booking.toObject(),
      },
      { excludeExtraneousValues: true },
    );
  }

  async findAll() {
    const bookings = await this.bookingModel
      .find()
      .sort({ startTime: 1 })
      .populate('userId', 'name email');

    return bookings.map((booking) =>
      plainToInstance(
        BookingResponseDto,
        {
          id: booking._id.toString(),
          ...booking.toObject(),
          name: booking.name,
          userId: booking.userId
            ? {
                id: booking.userId._id.toString(),
                name: (booking.userId as any).name,
                email: (booking.userId as any).email,
              }
            : null,
        },
        { excludeExtraneousValues: true },
      ),
    );
  }

  async findAllByUserId(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Invalid user id');
    }

    const bookings = await this.bookingModel
      .find({ userId }) // 🔥 filter by logged in user
      .sort({ startTime: 1 })
      .populate('userId', 'name email');

    return bookings.map((booking) =>
      plainToInstance(
        BookingResponseDto,
        {
          id: booking._id.toString(),
          ...booking.toObject(),
          userId: booking.userId
            ? {
                id: booking.userId._id.toString(),
                name: (booking.userId as any).name,
                email: (booking.userId as any).email,
              }
            : null,
        },
        { excludeExtraneousValues: true },
      ),
    );
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid booking id');
    }

    const booking = await this.bookingModel
      .findById(id)
      .populate('userId', 'name email');

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return plainToInstance(
      BookingResponseDto,
      {
        id: booking._id.toString(),
        ...booking.toObject(),
        userId: booking.userId
          ? {
              id: booking.userId._id.toString(),
              name: (booking.userId as any).name,
              email: (booking.userId as any).email,
            }
          : null,
      },
      { excludeExtraneousValues: true },
    );
  }

  async update(id: string, currentUser: any, dto: UpdateBookingDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid booking id');
    }

    const existing = await this.bookingModel.findById(id);
    if (!existing) {
      throw new NotFoundException('Booking not found');
    }

    if (
      currentUser.role === 'user' &&
      existing.userId.toString() !== currentUser.id
    ) {
      throw new ForbiddenException(
        'You are not allowed to update this booking',
      );
    }

    const startTime = dto.startTime
      ? new Date(dto.startTime)
      : existing.startTime;

    const endTime = dto.endTime ? new Date(dto.endTime) : existing.endTime;

    if (startTime >= endTime) {
      throw new ForbiddenException('End time must be after start time');
    }

    await this.checkTimeOverlap(startTime, endTime, id);

    const updated = await this.bookingModel.findByIdAndUpdate(id, dto, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updated) {
      throw new NotFoundException('Booking not found');
    }

    const populated = await this.bookingModel
      .findById(id)
      .populate('userId', 'name email');

    if (!populated) {
      throw new NotFoundException('Booking not found');
    }

    return plainToInstance(
      BookingResponseDto,
      {
        id: populated._id.toString(),
        ...populated.toObject(),
        userId: populated.userId
          ? {
              id: populated.userId._id.toString(),
              name: (populated.userId as any).name,
              email: (populated.userId as any).email,
            }
          : null,
      },
      { excludeExtraneousValues: true },
    );
  }

  async delete(id: string, currentUser: any) {
    const booking = await this.bookingModel.findById(id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (
      currentUser.role === 'user' &&
      existing.userId.toString() !== currentUser.id
    ) {
      throw new ForbiddenException(
        'You are not allowed to delete this booking',
      );
    }

    await this.bookingModel.findByIdAndDelete(id);

    return { message: 'Booking deleted successfully' };
  }

  private async checkTimeOverlap(
    startTime: Date,
    endTime: Date,
    excludeBookingId?: string,
  ) {
    const query: any = {
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    };

    // When updating, exclude current booking
    if (excludeBookingId) {
      query._id = { $ne: excludeBookingId };
    }

    const overlapping = await this.bookingModel.findOne(query);

    if (overlapping) {
      throw new ForbiddenException(
        'Booking time overlaps with existing booking',
      );
    }
  }
}
