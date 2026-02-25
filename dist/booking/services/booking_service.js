"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_1 = require("../models/booking");
const class_transformer_1 = require("class-transformer");
const booking_response_1 = require("../dtos/booking_response");
let BookingService = class BookingService {
    bookingModel;
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }
    async create(userId, dto) {
        const startTime = new Date(dto.startTime);
        const endTime = new Date(dto.endTime);
        if (startTime >= endTime) {
            throw new common_1.ForbiddenException('End time must be after start time');
        }
        await this.checkTimeOverlap(startTime, endTime);
        const booking = await this.bookingModel.create({
            ...dto,
            startTime,
            endTime,
            status: dto.status || 'pending',
            userId,
        });
        return (0, class_transformer_1.plainToInstance)(booking_response_1.BookingResponseDto, {
            id: booking._id.toString(),
            ...booking.toObject(),
        }, { excludeExtraneousValues: true });
    }
    async findAll() {
        const bookings = await this.bookingModel
            .find()
            .sort({ startTime: 1 })
            .populate('userId', 'name email');
        return bookings.map((booking) => (0, class_transformer_1.plainToInstance)(booking_response_1.BookingResponseDto, {
            id: booking._id.toString(),
            ...booking.toObject(),
            name: 'test',
            userId: booking.userId
                ? {
                    id: booking.userId._id.toString(),
                    name: booking.userId.name,
                    email: booking.userId.email,
                }
                : null,
        }, { excludeExtraneousValues: true }));
    }
    async findAllByUserId(userId) {
        if (!mongoose_2.Types.ObjectId.isValid(userId)) {
            throw new common_1.NotFoundException('Invalid user id');
        }
        const bookings = await this.bookingModel
            .find({ userId })
            .sort({ startTime: 1 })
            .populate('userId', 'name email');
        return bookings.map((booking) => (0, class_transformer_1.plainToInstance)(booking_response_1.BookingResponseDto, {
            id: booking._id.toString(),
            ...booking.toObject(),
            userId: booking.userId
                ? {
                    id: booking.userId._id.toString(),
                    name: booking.userId.name,
                    email: booking.userId.email,
                }
                : null,
        }, { excludeExtraneousValues: true }));
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Invalid booking id');
        }
        const booking = await this.bookingModel
            .findById(id)
            .populate('userId', 'name email');
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return (0, class_transformer_1.plainToInstance)(booking_response_1.BookingResponseDto, {
            id: booking._id.toString(),
            ...booking.toObject(),
            userId: booking.userId
                ? {
                    id: booking.userId._id.toString(),
                    name: booking.userId.name,
                    email: booking.userId.email,
                }
                : null,
        }, { excludeExtraneousValues: true });
    }
    async update(id, currentUser, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Invalid booking id');
        }
        const existing = await this.bookingModel.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (existing.userId.toString() !== currentUser.sub &&
            currentUser.role === 'user') {
            throw new common_1.ForbiddenException('You are not allowed to update this booking');
        }
        const startTime = dto.startTime
            ? new Date(dto.startTime)
            : existing.startTime;
        const endTime = dto.endTime ? new Date(dto.endTime) : existing.endTime;
        if (startTime >= endTime) {
            throw new common_1.ForbiddenException('End time must be after start time');
        }
        await this.checkTimeOverlap(startTime, endTime, id);
        const updated = await this.bookingModel.findByIdAndUpdate(id, dto, {
            returnDocument: 'after',
            runValidators: true,
        });
        if (!updated) {
            throw new common_1.NotFoundException('Booking not found');
        }
        const populated = await this.bookingModel
            .findById(id)
            .populate('userId', 'name email');
        if (!populated) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return (0, class_transformer_1.plainToInstance)(booking_response_1.BookingResponseDto, {
            id: populated._id.toString(),
            ...populated.toObject(),
            userId: populated.userId
                ? {
                    id: populated.userId._id.toString(),
                    name: populated.userId.name,
                    email: populated.userId.email,
                }
                : null,
        }, { excludeExtraneousValues: true });
    }
    async delete(id, currentUser) {
        const booking = await this.bookingModel.findById(id);
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.userId.toString() !== currentUser.sub &&
            currentUser.role === 'user') {
            throw new common_1.ForbiddenException('You are not allowed to delete this booking');
        }
        await this.bookingModel.findByIdAndDelete(id);
        return { message: 'Booking deleted successfully' };
    }
    async checkTimeOverlap(startTime, endTime, excludeBookingId) {
        const query = {
            startTime: { $lt: endTime },
            endTime: { $gt: startTime },
        };
        if (excludeBookingId) {
            query._id = { $ne: excludeBookingId };
        }
        const overlapping = await this.bookingModel.findOne(query);
        if (overlapping) {
            throw new common_1.ForbiddenException('Booking time overlaps with existing booking');
        }
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookingService);
//# sourceMappingURL=booking_service.js.map