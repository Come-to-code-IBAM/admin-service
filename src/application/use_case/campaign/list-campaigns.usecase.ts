import { CampaignEntity } from '../../../domain/entities/campaign.entity';
import { CampaignRepositoryPort } from '../../../domain/port/out/campaign.repository.port';

export class ListCampaignsUseCase {
  constructor(private readonly campaignRepo: CampaignRepositoryPort) {}
  async execute(): Promise<CampaignEntity[]> {
    throw new Error('Not implemented');
  }
}
