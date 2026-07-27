import { UserRepositoryPort } from '../../../domain/port/out/user.repository.port';

export interface LoginCommand {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  userPublicId: string;
}

/** Authentifie un opérateur (agent/admin). */
export class LoginUseCase {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async execute(command: LoginCommand): Promise<LoginResult> {
    throw new Error('Not implemented');
  }
}
