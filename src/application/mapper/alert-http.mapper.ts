import { AlertEntity } from '../../domain/entities/alert.entity';

export class AlertHttpMapper {
  static toResponse(alert: AlertEntity): Record<string, unknown> {
    return {
      publicId: alert.publicId,
      type: alert.type,
      relatedId: alert.relatedId ?? null,
      location: alert.location ?? null,
      recipients: alert.recipients ?? null,
      plan: alert.plan ?? null,
      deliveryMethod: alert.deliveryMethod,
      status: alert.status,
      sentAt: alert.sentAt ?? null,
      createdAt: alert.createdAt ?? null,
    };
  }
}
