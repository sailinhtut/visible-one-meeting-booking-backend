import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create_booking';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}
