import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { CampaignRepositoryPort } from '../../../domain/port/out/campaign.repository.port';
import { CampaignEntity } from '../../../domain/entities/campaign.entity';
import { CampaignPersistenceMapper } from './mapper/campaign-persistence.mapper';

@Injectable()
export class CampaignRepositoryAdapter implements CampaignRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(campaign: CampaignEntity): Promise<CampaignEntity> {
    const row = await this.prisma.campaignTable.create({
      data: CampaignPersistenceMapper.toPersistence(campaign),
    });
    return CampaignPersistenceMapper.toDomain(row);
  }

  async findByPublicId(publicId: string): Promise<CampaignEntity | null> {
    const row = await this.prisma.campaignTable.findUnique({ where: { public_id: publicId } });
    return row ? CampaignPersistenceMapper.toDomain(row) : null;
  }

  async findAll(): Promise<CampaignEntity[]> {
    const rows = await this.prisma.campaignTable.findMany();
    return rows.map(CampaignPersistenceMapper.toDomain);
  }
}
