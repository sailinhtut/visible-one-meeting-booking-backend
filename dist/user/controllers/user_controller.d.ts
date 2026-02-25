import { UserService } from '../services/user_service';
import { CreateUserDto } from '../dtos/create_user';
import { UpdateUserDto } from '../dtos/update_user';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getEnv(): NodeJS.ProcessEnv;
    create(dto: CreateUserDto): Promise<import("../dtos/user_response").UserResponseDto>;
    findAll(): Promise<import("../dtos/user_response").UserResponseDto[]>;
    findById(id: string): Promise<import("../dtos/user_response").UserResponseDto>;
    update(id: string, dto: UpdateUserDto): Promise<import("../dtos/user_response").UserResponseDto>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
