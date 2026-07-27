import { CampaignEntity } from '../../domain/entities/campaign.entity';

export class CampaignHttpMapper {
  static toResponse(campaign: CampaignEntity): Record<string, unknown> {
    throw new Error('Not implemented');
  }
}
