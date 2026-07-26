import { AlertEntity } from '../../domain/entities/alert.entity';

export class AlertHttpMapper {
  static toResponse(alert: AlertEntity): Record<string, unknown> {
    throw new Error('Not implemented');
  }
}
