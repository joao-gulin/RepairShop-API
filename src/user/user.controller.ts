import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Post,
  UseGuards,
  Param,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (req.user.role !== 'ADMIN' && req.user.userId !== id) {
      throw new ForbiddenException('You do not have access to this resource');
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return { message: 'User created successfully', userId: user.id };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.role !== 'ADMIN' && req.user.userId != id) {
      throw new ForbiddenException(
        'You do not have access to update this user',
      );
    }
    return this.userService.updateUser(id, UpdateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'ADMIN' && req.user.userId !== id) {
      throw new ForbiddenException(
        'You do not have access to delete this user',
      );
    }
    return this.userService.deleteUser(id);
  }
}
