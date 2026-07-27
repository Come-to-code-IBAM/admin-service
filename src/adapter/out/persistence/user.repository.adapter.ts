import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { UserRepositoryPort } from '../../../domain/port/out/user.repository.port';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}
  async save(u: UserEntity): Promise<UserEntity> { throw new Error('Not implemented'); }
  async findByPublicId(publicId: string): Promise<UserEntity | null> { throw new Error('Not implemented'); }
  async findByEmail(email: string): Promise<UserEntity | null> { throw new Error('Not implemented'); }
  async findAll(): Promise<UserEntity[]> { throw new Error('Not implemented'); }
}
