export declare enum UserRole {
    ADMIN = "admin",
    OWNER = "owner",
    USER = "user"
}
export declare class CreateUserDto {
    name: string;
    email: string;
    role: string;
    password: string;
}
