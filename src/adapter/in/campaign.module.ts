import { Module } from '@nestjs/common';
import { CampaignControllerAdapter } from './campaign/campaign.controller.adapter';
import { CreateCampaignUseCase } from '../../application/use_case/campaign/create-campaign.usecase';
import { ListCampaignsUseCase } from '../../application/use_case/campaign/list-campaigns.usecase';
import { CampaignRepositoryAdapter } from '../out/persistence/campaign.repository.adapter';
import { AuditLogRepositoryAdapter } from '../out/persistence/audit-log.repository.adapter';
import { NanoidGeneratorAdapter } from '../out/public-id/nanoid-generator.adapter';
import { CreateCampaignValidator } from '../../domain/services/validators/campaign/create-campaign.validator';
import { CAMPAIGN_REPOSITORY } from '../../domain/port/out/campaign.repository.port';
import { AUDIT_LOG_REPOSITORY } from '../../domain/port/out/audit-log.repository.port';
import { PUBLIC_ID_GENERATOR } from '../../domain/port/in/generate-public-id/generator-public-id.port';

@Module({
  controllers: [CampaignControllerAdapter],
  providers: [
    { provide: CAMPAIGN_REPOSITORY, useClass: CampaignRepositoryAdapter },
    { provide: AUDIT_LOG_REPOSITORY, useClass: AuditLogRepositoryAdapter },
    { provide: PUBLIC_ID_GENERATOR, useClass: NanoidGeneratorAdapter },
    CreateCampaignValidator,
    CreateCampaignUseCase,
    ListCampaignsUseCase,
  ],
})
export class CampaignModule {}
