import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, password } = registerDto;
    const existingUser = await this.prisma.user.findUnique({ where: { name } });

    if (existingUser) {
      throw new ConflictException('A user with this name already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
    };
  }

  async login(loginDto: LoginDto) {
    const { name, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { name } });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      access_token: accessToken,
    };
  }

  async getCurrentUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    return {
      id: user.id,
      name: user.name,
    };
  }
}
