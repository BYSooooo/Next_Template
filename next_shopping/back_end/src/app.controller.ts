import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  checkHealth() {
    return { status : 'ok' }
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    return {
      message : 'This information is available auth user',
      user : req.user
    }
  }
}
