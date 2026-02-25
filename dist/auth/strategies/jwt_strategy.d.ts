import { UserService } from 'src/user/services/user_service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    private configService;
    constructor(userService: UserService, configService: ConfigService);
    validate(payload: any): Promise<import("../../user/dtos/user_response").UserResponseDto>;
}
export {};
