import { Module } from '@nestjs/common';
import { UserController } from './controllers/user_controller';
import { UserService } from './services/user_service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user';
import { Booking, BookingSchema } from 'src/booking/models/booking';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
