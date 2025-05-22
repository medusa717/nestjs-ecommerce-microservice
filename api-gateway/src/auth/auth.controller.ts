import { UserType } from '@my/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jtw-auth.guard';
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) throw new UnauthorizedException('Geçersiz kimlik bilgileri');

    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard) // Verify JWT token
  refreshToken(@Req() req: Request & { user: UserType }) {
    const user = req.user as Partial<UserType>;
    return this.authService.refreshToken(user);
  }
}
