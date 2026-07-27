import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../../../application/use_case/auth/login.usecase';
import { LoginRequestDto } from '../dto/auth-request.dto';

@Controller('auth')
export class AuthControllerAdapter {
  constructor(private readonly login: LoginUseCase) {}

  @Post('login')
  async signIn(@Body() dto: LoginRequestDto) {
    throw new Error('Not implemented');
  }
}
