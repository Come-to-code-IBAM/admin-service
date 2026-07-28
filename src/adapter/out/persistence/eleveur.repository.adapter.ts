import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { EleveurRepositoryPort } from '../../../domain/port/out/eleveur.repository.port';
import { EleveurEntity } from '../../../domain/entities/eleveur.entity';
import { EleveurPersistenceMapper } from './mapper/eleveur-persistence.mapper';

@Injectable()
export class EleveurRepositoryAdapter implements EleveurRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(eleveur: EleveurEntity): Promise<EleveurEntity> {
    const row = await this.prisma.eleveurTable.create({
      data: EleveurPersistenceMapper.toPersistence(eleveur),
    });
    return EleveurPersistenceMapper.toDomain(row);
  }

  async findByPublicId(publicId: string): Promise<EleveurEntity | null> {
    const row = await this.prisma.eleveurTable.findUnique({ where: { public_id: publicId } });
    return row ? EleveurPersistenceMapper.toDomain(row) : null;
  }

  async findByPhone(phone: string): Promise<EleveurEntity | null> {
    const row = await this.prisma.eleveurTable.findUnique({ where: { phone_number: phone } });
    return row ? EleveurPersistenceMapper.toDomain(row) : null;
  }

  async findAll(): Promise<EleveurEntity[]> {
    const rows = await this.prisma.eleveurTable.findMany();
    return rows.map(EleveurPersistenceMapper.toDomain);
  }
}
