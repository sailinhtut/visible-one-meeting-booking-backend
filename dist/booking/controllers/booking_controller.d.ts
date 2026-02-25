import { CreateBookingDto } from '../dtos/create_booking';
import { BookingService } from '../services/booking_service';
import { UpdateBookingDto } from '../dtos/update_booking';
export declare class BookingController {
    private bookingService;
    constructor(bookingService: BookingService);
    create(req: any, dto: CreateBookingDto): Promise<import("../dtos/booking_response").BookingResponseDto>;
    findAll(): Promise<import("../dtos/booking_response").BookingResponseDto[]>;
    findMyBookings(id: string): Promise<import("../dtos/booking_response").BookingResponseDto[]>;
    findById(id: string): Promise<import("../dtos/booking_response").BookingResponseDto>;
    update(id: string, req: any, dto: UpdateBookingDto): Promise<import("../dtos/booking_response").BookingResponseDto>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
}
