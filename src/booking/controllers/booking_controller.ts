import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt_guard';
import { RolesGuard } from 'src/auth/guards/role_guard';
import { Roles } from 'src/auth/decorators/roles';
import { CreateBookingDto } from '../dtos/create_booking';
import { BookingService } from '../services/booking_service';
import { UpdateBookingDto } from '../dtos/update_booking';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateBookingDto) {
    return this.bookingService.create(req.user.id, dto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get('user/:id')
  findMyBookings(@Param('id') id: string) {
    return this.bookingService.findAllByUserId(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookingService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: UpdateBookingDto,
  ) {
    return this.bookingService.update(id, req.user, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.bookingService.delete(id, req.user);
  }
}
