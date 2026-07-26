import { CampaignChannelEnum, CampaignAudienceEnum, CampaignStatusEnum } from '../enums/campaign.enum';

export interface CampaignProps {
  id?: string;
  publicId: string;
  title: string;
  content: string;
  channel: CampaignChannelEnum;
  targetVillage?: string;
  targetAudience: CampaignAudienceEnum;
  status: CampaignStatusEnum;
  startDate: Date;
  endDate?: Date;
  createdBy: string;
  createdAt?: Date;
}

/** Campagne de sensibilisation. */
export class CampaignEntity {
  constructor(props: CampaignProps) {
    Object.assign(this, props);
  }
}
