import { AlertTable, Prisma } from '@prisma/client';
import { AlertEntity } from '../../../../domain/entities/alert.entity';
import {
  AlertTypeEnum,
  AlertPlanEnum,
  AlertDeliveryEnum,
  AlertStatusEnum,
} from '../../../../domain/enums/alert.enum';

/** Convertit une ligne Prisma (AlertTable) en entité de domaine et inversement. */
export class AlertPersistenceMapper {
  static toDomain(row: AlertTable): AlertEntity {
    return new AlertEntity({
      id: row.id,
      publicId: row.public_id,
      type: row.type as AlertTypeEnum,
      relatedId: row.related_id ?? undefined,
      location: row.location ?? undefined,
      recipients: row.recipients ?? undefined,
      plan: row.plan ? (row.plan as AlertPlanEnum) : undefined,
      deliveryMethod: row.delivery_method as AlertDeliveryEnum,
      status: row.status as AlertStatusEnum,
      sentAt: row.sent_at ?? undefined,
      createdAt: row.created_at,
    });
  }

  static toPersistence(alert: AlertEntity): Prisma.AlertTableUncheckedCreateInput {
    return {
      public_id: alert.publicId,
      type: alert.type,
      related_id: alert.relatedId ?? null,
      location: alert.location ?? null,
      recipients: alert.recipients ?? null,
      plan: alert.plan ?? null,
      delivery_method: alert.deliveryMethod,
      status: alert.status,
      sent_at: alert.sentAt ?? null,
    };
  }
}
