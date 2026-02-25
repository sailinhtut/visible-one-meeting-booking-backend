import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth_service';
import { LoginDto } from '../dtos/login';
import { RegisterDto } from '../dtos/register';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
