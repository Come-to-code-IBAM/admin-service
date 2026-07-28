import { AlertEntity } from '../../../domain/entities/alert.entity';
import { AlertRepositoryPort } from '../../../domain/port/out/alert.repository.port';

/** Liste les alertes pour le dashboard admin. */
export class ListAlertsUseCase {
  constructor(private readonly alertRepo: AlertRepositoryPort) {}

  async execute(): Promise<AlertEntity[]> {
    return this.alertRepo.listAlerts();
  }
}
