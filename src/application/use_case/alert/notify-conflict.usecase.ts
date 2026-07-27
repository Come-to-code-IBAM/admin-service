import { AlertEntity } from '../../../domain/entities/alert.entity';
import { AlertRepositoryPort } from '../../../domain/port/out/alert.repository.port';
import { PublicIdGeneratorPort } from '../../../domain/port/in/generate-public-id/generator-public-id.port';
import { AlertPlanEnum } from '../../../domain/enums/alert.enum';

export interface NotifyConflictCommand {
  zoneId: string;
  location?: string;
  timestamp: Date;
  plan: AlertPlanEnum; // remonté par l'appareil (plan B ou C)
}

/**
 * Le serveur identifie l'agriculteur de la zone et l'alerte
 * (internet, sinon SMS/appel). Plans B et C de la cascade.
 */
export class NotifyConflictUseCase {
  constructor(
    private readonly alertRepo: AlertRepositoryPort,
    private readonly publicId: PublicIdGeneratorPort,
  ) {}

  async execute(command: NotifyConflictCommand): Promise<AlertEntity> {
    throw new Error('Not implemented');
  }
}
