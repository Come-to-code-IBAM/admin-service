import { CampaignEntity } from '../../../entities/campaign.entity';
import { BusinessError } from '../../../errors/business.error';
import { DomainErrorCode } from '../../../errors/codes.error';

/** Règles de validation à la création d'une campagne. */
export class CreateCampaignValidator {
  validate(campaign: CampaignEntity): void {
    if (!campaign.title?.trim()) {
      throw new BusinessError(DomainErrorCode.CAMPAIGN_INVALID, 'Le titre de la campagne est requis.');
    }
    if (!campaign.content?.trim()) {
      throw new BusinessError(DomainErrorCode.CAMPAIGN_INVALID, 'Le contenu de la campagne est requis.');
    }
    if (campaign.endDate && campaign.endDate < campaign.startDate) {
      throw new BusinessError(
        DomainErrorCode.CAMPAIGN_INVALID,
        'La date de fin ne peut pas précéder la date de début.',
      );
    }
  }
}
