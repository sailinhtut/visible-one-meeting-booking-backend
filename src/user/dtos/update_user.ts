import { IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from './create_user';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: string;

  @IsOptional()
  @MinLength(6)
  password?: string;
}
