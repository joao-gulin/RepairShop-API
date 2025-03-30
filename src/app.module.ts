import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [AuthModule, UsersModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
