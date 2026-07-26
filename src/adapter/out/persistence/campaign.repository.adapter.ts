import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { CampaignRepositoryPort } from '../../../domain/port/out/campaign.repository.port';
import { CampaignEntity } from '../../../domain/entities/campaign.entity';

@Injectable()
export class CampaignRepositoryAdapter implements CampaignRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}
  async save(c: CampaignEntity): Promise<CampaignEntity> { throw new Error('Not implemented'); }
  async findByPublicId(publicId: string): Promise<CampaignEntity | null> { throw new Error('Not implemented'); }
  async findAll(): Promise<CampaignEntity[]> { throw new Error('Not implemented'); }
}
