import { CampaignChannelEnum, CampaignAudienceEnum } from '../../../domain/enums/campaign.enum';

export class CreateCampaignRequestDto {
  title!: string;
  content!: string;
  channel!: CampaignChannelEnum;
  targetAudience!: CampaignAudienceEnum;
  targetVillage?: string;
  startDate!: string;
  endDate?: string;
}
