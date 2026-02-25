import { Module } from '@nestjs/common';
import { AppController } from './controllers/app_controller';

@Module({
  controllers: [AppController],
})
export class CommonModule {}
