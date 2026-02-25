import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create_user';
import { User, UserDocument } from '../models/user';
import { UpdateUserDto } from '../dtos/update_user';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dtos/user_response';
import { Booking } from 'src/booking/models/booking';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Booking.name)
    private bookingModel: Model<Booking>,
  ) {}

  async create(dto: CreateUserDto) {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) throw new ConflictException('Email already exists');

    const user = await this.userModel.create(dto);

    return plainToInstance(
      UserResponseDto,
      {
        id: user._id.toString(),
        ...user.toObject(),
      },
      { excludeExtraneousValues: true },
    );
  }

  async findAll() {
    const users = await this.userModel.find();

    return users.map((user) =>
      plainToInstance(
        UserResponseDto,
        {
          id: user._id.toString(),
          ...user.toObject(),
        },
        { excludeExtraneousValues: true },
      ),
    );
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid user id');
    }

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return plainToInstance(
      UserResponseDto,
      {
        id: user._id.toString(),
        ...user.toObject(),
      },
      { excludeExtraneousValues: true },
    );
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid user id');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.userModel.findByIdAndUpdate(id, dto, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updated) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(
      UserResponseDto,
      {
        id: updated._id.toString(),
        ...updated.toObject(),
      },
      { excludeExtraneousValues: true },
    );
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid user id');
    }

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.bookingModel.deleteMany({ userId: user._id.toString() });
    await this.userModel.findByIdAndDelete(id);

    return { message: 'User and related bookings deleted successfully' };
  }
}
