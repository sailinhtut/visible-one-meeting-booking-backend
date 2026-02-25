import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user_service';
import { JwtAuthGuard } from 'src/auth/guards/jwt_guard';
import { RolesGuard } from 'src/auth/guards/role_guard';
import { CreateUserDto } from '../dtos/create_user';
import { Roles } from 'src/auth/decorators/roles';
import { UpdateUserDto } from '../dtos/update_user';
import { Reflector } from '@nestjs/core';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('env')
  getEnv() {
    return process.env;
  }

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
