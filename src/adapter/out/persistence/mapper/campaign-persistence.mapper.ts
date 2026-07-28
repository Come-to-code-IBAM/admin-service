import { CampaignTable, Prisma } from '@prisma/client';
import { CampaignEntity } from '../../../../domain/entities/campaign.entity';
import {
  CampaignChannelEnum,
  CampaignAudienceEnum,
  CampaignStatusEnum,
} from '../../../../domain/enums/campaign.enum';

/** Convertit une ligne Prisma (CampaignTable) en entité de domaine et inversement. */
export class CampaignPersistenceMapper {
  static toDomain(row: CampaignTable): CampaignEntity {
    return new CampaignEntity({
      id: row.id,
      publicId: row.public_id,
      title: row.title,
      content: row.content,
      channel: row.channel as CampaignChannelEnum,
      targetVillage: row.target_village ?? undefined,
      targetAudience: row.target_audience as CampaignAudienceEnum,
      status: row.status as CampaignStatusEnum,
      startDate: row.start_date,
      endDate: row.end_date ?? undefined,
      createdBy: row.created_by,
      createdAt: row.created_at,
    });
  }

  static toPersistence(campaign: CampaignEntity): Prisma.CampaignTableUncheckedCreateInput {
    return {
      public_id: campaign.publicId,
      title: campaign.title,
      content: campaign.content,
      channel: campaign.channel,
      target_village: campaign.targetVillage ?? null,
      target_audience: campaign.targetAudience,
      status: campaign.status,
      start_date: campaign.startDate,
      end_date: campaign.endDate ?? null,
      created_by: campaign.createdBy,
    };
  }
}
