import { CampaignEntity } from '../../entities/campaign.entity';

export interface CampaignRepositoryPort {
  save(campaign: CampaignEntity): Promise<CampaignEntity>;
  findByPublicId(publicId: string): Promise<CampaignEntity | null>;
  findAll(): Promise<CampaignEntity[]>;
}
export const CAMPAIGN_REPOSITORY = Symbol('CampaignRepositoryPort');
