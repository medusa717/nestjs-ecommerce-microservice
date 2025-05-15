import { LoginDto } from './dto/login.dto';
import { AppService } from './app.service';
import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { MessagePattern } from '@nestjs/microservices';
import { AuthPatterns } from './common/patterns/auth.patterns';
import { JwtPayload } from './common/types/JwtType';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: AuthPatterns.FindByEmail })
  findByEmail(
    @Payload() { email, password }: { email: string; password: string },
  ) {
    return this.appService.findByEmail(email, password);
  }

  @MessagePattern({ cmd: AuthPatterns.Login })
  login(@Payload() loginDto: LoginDto) {
    return this.appService.login(loginDto);
  }

  @MessagePattern({ cmd: AuthPatterns.Refresh })
  refresh(@Payload() payload: JwtPayload) {
    return this.appService.refreshToken(payload);
  }
}
