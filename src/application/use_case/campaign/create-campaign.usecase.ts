import { CampaignEntity } from '../../../domain/entities/campaign.entity';
import { CampaignRepositoryPort } from '../../../domain/port/out/campaign.repository.port';
import { AuditLogRepositoryPort } from '../../../domain/port/out/audit-log.repository.port';
import {
  PublicIdGeneratorPort,
  PublicIdPrefix,
} from '../../../domain/port/in/generate-public-id/generator-public-id.port';
import { CreateCampaignValidator } from '../../../domain/services/validators/campaign/create-campaign.validator';
import {
  CampaignChannelEnum,
  CampaignAudienceEnum,
  CampaignStatusEnum,
} from '../../../domain/enums/campaign.enum';
import { AuditLogEntity } from '../../../domain/entities/audit-log.entity';
import { AuditEventTypeEnum, AuditResultEnum } from '../../../domain/enums/audit-event-type.enum';

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
    const candidate = new CampaignEntity({
      publicId: this.publicId.generate(PublicIdPrefix.CAMPAIGN),
      title: command.title,
      content: command.content,
      channel: command.channel,
      targetVillage: command.targetVillage,
      targetAudience: command.targetAudience,
      status: CampaignStatusEnum.DRAFT,
      startDate: command.startDate,
      endDate: command.endDate,
      createdBy: command.createdBy,
    });

    this.validator.validate(candidate);

    const saved = await this.campaignRepo.save(candidate);

    await this.auditRepo.append(
      new AuditLogEntity({
        publicId: this.publicId.generate(PublicIdPrefix.AUDIT),
        actorId: command.createdBy,
        eventType: AuditEventTypeEnum.CAMPAIGN_CREATED,
        entity: 'Campaign',
        entityId: saved.publicId,
        result: AuditResultEnum.SUCCESS,
      }),
    );

    return saved;
  }
}
