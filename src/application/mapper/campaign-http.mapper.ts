import { CampaignEntity } from '../../domain/entities/campaign.entity';

export class CampaignHttpMapper {
  static toResponse(campaign: CampaignEntity): Record<string, unknown> {
    return {
      publicId: campaign.publicId,
      title: campaign.title,
      content: campaign.content,
      channel: campaign.channel,
      targetVillage: campaign.targetVillage ?? null,
      targetAudience: campaign.targetAudience,
      status: campaign.status,
      startDate: campaign.startDate,
      endDate: campaign.endDate ?? null,
      createdBy: campaign.createdBy,
      createdAt: campaign.createdAt ?? null,
    };
  }
}
