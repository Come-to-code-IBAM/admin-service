import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { AnimalRepositoryPort } from '../../../domain/port/out/animal.repository.port';
import { AnimalEntity } from '../../../domain/entities/animal.entity';
import { AnimalStatusEnum } from '../../../domain/enums/animal-status.enum';

/** Implémentation Prisma du dépôt Animal. */
@Injectable()
export class AnimalRepositoryAdapter implements AnimalRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(animal: AnimalEntity): Promise<AnimalEntity> {
    throw new Error('Not implemented');
  }
  async findByPublicId(publicId: string): Promise<AnimalEntity | null> {
    throw new Error('Not implemented');
  }
  async findBySignatureId(signatureId: string): Promise<AnimalEntity | null> {
    throw new Error('Not implemented');
  }
  async findByOwner(ownerId: string): Promise<AnimalEntity[]> {
    throw new Error('Not implemented');
  }
  async updateStatus(publicId: string, status: AnimalStatusEnum): Promise<AnimalEntity> {
    throw new Error('Not implemented');
  }
  async findAll(): Promise<AnimalEntity[]> {
    throw new Error('Not implemented');
  }
}
