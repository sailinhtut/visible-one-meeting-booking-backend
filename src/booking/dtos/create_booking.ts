import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator';

enum BookingStatus {
  MEETING = 'meeting',
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // 2026-03-01T10:30:00.000Z (ISO 8601)
  @IsDateString()
  startTime: Date;

  // 2026-03-01T10:30:00.000Z (ISO 8601)
  @IsDateString()
  endTime: Date;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: string;
}
