import { AppService } from './app.service';
import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { AuthPatterns, LoginDto } from '@my/common';
import { JwtPayload } from './common/types/JwtType';
import { MessagePattern } from '@nestjs/microservices';

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

  @MessagePattern({ cmd: AuthPatterns.Verify })
  verify(@Payload() token: string) {
    return this.appService.verifyToken(token);
  }

  @MessagePattern({ cmd: AuthPatterns.Refresh })
  refresh(@Payload() payload: JwtPayload) {
    return this.appService.refreshToken(payload);
  }
}
