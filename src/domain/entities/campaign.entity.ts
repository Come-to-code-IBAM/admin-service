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
  readonly id?: string;
  readonly publicId!: string;
  readonly title!: string;
  readonly content!: string;
  readonly channel!: CampaignChannelEnum;
  readonly targetVillage?: string;
  readonly targetAudience!: CampaignAudienceEnum;
  readonly status!: CampaignStatusEnum;
  readonly startDate!: Date;
  readonly endDate?: Date;
  readonly createdBy!: string;
  readonly createdAt?: Date;

  constructor(props: CampaignProps) {
    Object.assign(this, props);
  }
}
