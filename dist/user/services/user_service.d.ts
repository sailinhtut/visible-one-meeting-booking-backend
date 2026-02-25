import { Model, Types } from 'mongoose';
import { CreateUserDto } from '../dtos/create_user';
import { User, UserDocument } from '../models/user';
import { UpdateUserDto } from '../dtos/update_user';
import { UserResponseDto } from '../dtos/user_response';
import { Booking } from 'src/booking/models/booking';
export declare class UserService {
    private userModel;
    private bookingModel;
    constructor(userModel: Model<UserDocument>, bookingModel: Model<Booking>);
    create(dto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findById(id: string): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & User & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, dto: UpdateUserDto): Promise<UserResponseDto>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
