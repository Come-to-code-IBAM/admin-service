import { AlertEntity } from '../../../domain/entities/alert.entity';
import { AlertRepositoryPort } from '../../../domain/port/out/alert.repository.port';
import {
  PublicIdGeneratorPort,
  PublicIdPrefix,
} from '../../../domain/port/in/generate-public-id/generator-public-id.port';
import {
  AlertPlanEnum,
  AlertTypeEnum,
  AlertStatusEnum,
  AlertDeliveryEnum,
} from '../../../domain/enums/alert.enum';

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
    // Pas encore de AgriculteurRepositoryPort/lookup par zone dans ce scaffold :
    // on trace l'alerte avec les données remontées par l'appareil, sans résoudre
    // ni notifier de destinataire réel pour l'instant.
    const deliveryMethod =
      command.plan === AlertPlanEnum.B ? AlertDeliveryEnum.INTERNET : AlertDeliveryEnum.SMS;

    const alert = new AlertEntity({
      publicId: this.publicId.generate(PublicIdPrefix.ALERT),
      type: AlertTypeEnum.CONFLICT,
      relatedId: command.zoneId,
      location: command.location,
      plan: command.plan,
      deliveryMethod,
      status: AlertStatusEnum.OPEN,
      sentAt: command.timestamp,
    });

    return this.alertRepo.saveAlert(alert);
  }
}
