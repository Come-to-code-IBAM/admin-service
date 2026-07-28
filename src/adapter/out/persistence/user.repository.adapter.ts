import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { UserRepositoryPort } from '../../../domain/port/out/user.repository.port';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserPersistenceMapper } from './mapper/user-persistence.mapper';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const row = await this.prisma.userTable.create({
      data: UserPersistenceMapper.toPersistence(user),
    });
    return UserPersistenceMapper.toDomain(row);
  }

  async findByPublicId(publicId: string): Promise<UserEntity | null> {
    const row = await this.prisma.userTable.findUnique({ where: { public_id: publicId } });
    return row ? UserPersistenceMapper.toDomain(row) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const row = await this.prisma.userTable.findUnique({ where: { email } });
    return row ? UserPersistenceMapper.toDomain(row) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const rows = await this.prisma.userTable.findMany();
    return rows.map(UserPersistenceMapper.toDomain);
  }
}
