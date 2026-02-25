import { Controller, Get } from '@nestjs/common';

@Controller({
  path: '',
  version: '1',
})
export class AppController {
  @Get('')
  getHello(): any {
    return {
      message: 'Welcome to Visible One Meeting Booking API',
      documentation: 'Visit at /api for API documentation',
    };
  }
}
