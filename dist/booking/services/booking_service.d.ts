import { Model } from 'mongoose';
import { Booking } from '../models/booking';
import { CreateBookingDto } from '../dtos/create_booking';
import { UpdateBookingDto } from '../dtos/update_booking';
import { BookingResponseDto } from '../dtos/booking_response';
export declare class BookingService {
    private bookingModel;
    constructor(bookingModel: Model<Booking>);
    create(userId: string, dto: CreateBookingDto): Promise<BookingResponseDto>;
    findAll(): Promise<BookingResponseDto[]>;
    findAllByUserId(userId: string): Promise<BookingResponseDto[]>;
    findById(id: string): Promise<BookingResponseDto>;
    update(id: string, currentUser: any, dto: UpdateBookingDto): Promise<BookingResponseDto>;
    delete(id: string, currentUser: any): Promise<{
        message: string;
    }>;
    private checkTimeOverlap;
}
