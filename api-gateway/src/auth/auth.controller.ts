import { AuthService } from './auth.service';
import { UserType, LoginDto } from '@my/common';
import { JwtAuthGuard } from './guards/jtw-auth.guard';
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in and returns JWT token',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) throw new UnauthorizedException('Geçersiz kimlik bilgileri');

    return this.authService.login(loginDto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify user credentials' })
  @ApiResponse({
    status: 200,
    description: 'User credentials are valid',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // Verify JWT token
  verifyUser(@Req() req: Request & { user: UserType }) {
    const user = req.user as Partial<UserType>;
    return user;
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user information and refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Returns current user information and new JWT token',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // Verify JWT token
  refreshToken(@Req() req: Request & { user: UserType }) {
    const user = req.user as Partial<UserType>;
    return this.authService.refreshToken(user);
  }
}
