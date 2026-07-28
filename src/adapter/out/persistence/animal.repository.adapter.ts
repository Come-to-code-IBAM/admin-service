import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { AnimalRepositoryPort } from '../../../domain/port/out/animal.repository.port';
import { AnimalEntity } from '../../../domain/entities/animal.entity';
import { AnimalStatusEnum } from '../../../domain/enums/animal-status.enum';
import { AnimalPersistenceMapper } from './mapper/animal-persistence.mapper';

/** Implémentation Prisma du dépôt Animal. */
@Injectable()
export class AnimalRepositoryAdapter implements AnimalRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(animal: AnimalEntity): Promise<AnimalEntity> {
    const row = await this.prisma.animalTable.create({
      data: AnimalPersistenceMapper.toPersistence(animal),
    });
    return AnimalPersistenceMapper.toDomain(row);
  }

  async findByPublicId(publicId: string): Promise<AnimalEntity | null> {
    const row = await this.prisma.animalTable.findUnique({ where: { public_id: publicId } });
    return row ? AnimalPersistenceMapper.toDomain(row) : null;
  }

  async findBySignatureId(signatureId: string): Promise<AnimalEntity | null> {
    const row = await this.prisma.animalTable.findUnique({ where: { signature_id: signatureId } });
    return row ? AnimalPersistenceMapper.toDomain(row) : null;
  }

  async findByOwner(ownerId: string): Promise<AnimalEntity[]> {
    const rows = await this.prisma.animalTable.findMany({ where: { owner_id: ownerId } });
    return rows.map(AnimalPersistenceMapper.toDomain);
  }

  async updateStatus(publicId: string, status: AnimalStatusEnum): Promise<AnimalEntity> {
    const row = await this.prisma.animalTable.update({
      where: { public_id: publicId },
      data: { status },
    });
    return AnimalPersistenceMapper.toDomain(row);
  }

  async findAll(): Promise<AnimalEntity[]> {
    const rows = await this.prisma.animalTable.findMany();
    return rows.map(AnimalPersistenceMapper.toDomain);
  }
}
