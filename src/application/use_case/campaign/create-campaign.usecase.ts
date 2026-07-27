import { CampaignEntity } from '../../../domain/entities/campaign.entity';
import { CampaignRepositoryPort } from '../../../domain/port/out/campaign.repository.port';
import { AuditLogRepositoryPort } from '../../../domain/port/out/audit-log.repository.port';
import { PublicIdGeneratorPort } from '../../../domain/port/in/generate-public-id/generator-public-id.port';
import { CreateCampaignValidator } from '../../../domain/services/validators/campaign/create-campaign.validator';
import { CampaignChannelEnum, CampaignAudienceEnum } from '../../../domain/enums/campaign.enum';

export interface CreateCampaignCommand {
  title: string;
  content: string;
  channel: CampaignChannelEnum;
  targetAudience: CampaignAudienceEnum;
  targetVillage?: string;
  startDate: Date;
  endDate?: Date;
  createdBy: string;
}

/** Crée une campagne de sensibilisation (admin). */
export class CreateCampaignUseCase {
  constructor(
    private readonly campaignRepo: CampaignRepositoryPort,
    private readonly auditRepo: AuditLogRepositoryPort,
    private readonly publicId: PublicIdGeneratorPort,
    private readonly validator: CreateCampaignValidator,
  ) {}

  async execute(command: CreateCampaignCommand): Promise<CampaignEntity> {
    throw new Error('Not implemented');
  }
}
