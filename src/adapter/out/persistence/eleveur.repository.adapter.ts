import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { EleveurRepositoryPort } from '../../../domain/port/out/eleveur.repository.port';
import { EleveurEntity } from '../../../domain/entities/eleveur.entity';

@Injectable()
export class EleveurRepositoryAdapter implements EleveurRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}
  async save(e: EleveurEntity): Promise<EleveurEntity> { throw new Error('Not implemented'); }
  async findByPublicId(publicId: string): Promise<EleveurEntity | null> { throw new Error('Not implemented'); }
  async findByPhone(phone: string): Promise<EleveurEntity | null> { throw new Error('Not implemented'); }
  async findAll(): Promise<EleveurEntity[]> { throw new Error('Not implemented'); }
}
