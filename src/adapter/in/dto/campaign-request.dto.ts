import { CampaignChannelEnum, CampaignAudienceEnum } from '../../../domain/enums/campaign.enum';

export class CreateCampaignRequestDto {
  title!: string;
  content!: string;
  channel!: CampaignChannelEnum;
  targetAudience!: CampaignAudienceEnum;
  targetVillage?: string;
  startDate!: string;
  endDate?: string;
  // TODO(1.5): remplacer par l'admin authentifié (req.user) une fois l'auth câblée.
  createdBy!: string;
}
