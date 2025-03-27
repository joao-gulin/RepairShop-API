import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/user.service';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || '123456';

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate a user's credentials (email and password)
  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Omit password before returning
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Generate a JWT token for the user
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '1h',
      }),
    };
  }
}
