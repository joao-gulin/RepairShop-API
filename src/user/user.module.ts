import { PrismaService } from 'src/prisma.service';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
