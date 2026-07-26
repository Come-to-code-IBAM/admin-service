import { Injectable } from '@nestjs/common';

/** Émission et vérification des jetons de session (JWT). */
@Injectable()
export class TokenService {
  sign(payload: Record<string, unknown>): string {
    throw new Error('Not implemented');
  }
  verify<T = Record<string, unknown>>(token: string): T {
    throw new Error('Not implemented');
  }
}
