import { Injectable } from '@nestjs/common';

/** Hachage et vérification des mots de passe (agents/admins). */
@Injectable()
export class PasswordService {
  async hash(plain: string): Promise<string> {
    throw new Error('Not implemented');
  }
  async verify(plain: string, hash: string): Promise<boolean> {
    throw new Error('Not implemented');
  }
}
