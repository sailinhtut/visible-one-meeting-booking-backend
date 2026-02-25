import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({
  path: '',
  version: VERSION_NEUTRAL,
})
export class AppController {
  @Get()
  getHello(): any {
    return {
      message: 'Welcome to Visible One Meeting Booking API',
      documentation:
        'Visit at /docs (UI) and /docs-json (JSON) for API documentation',
    };
  }
}
