import { Module } from '@nestjs/common';
import { AuthControllerAdapter } from './auth/auth.controller.adapter';
import { LoginUseCase } from '../../application/use_case/auth/login.usecase';
import { UserRepositoryAdapter } from '../out/persistence/user.repository.adapter';
import { PasswordService } from '../../infrastructure/auth/password.service';
import { TokenService } from '../../infrastructure/auth/token.service';
import { USER_REPOSITORY } from '../../domain/port/out/user.repository.port';

@Module({
  controllers: [AuthControllerAdapter],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepositoryAdapter },
    PasswordService,
    TokenService,
    LoginUseCase,
  ],
})
export class AuthModule {}
