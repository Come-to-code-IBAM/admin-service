import { AuditLogTable, Prisma } from '@prisma/client';
import { AuditLogEntity } from '../../../../domain/entities/audit-log.entity';
import { AuditEventTypeEnum, AuditResultEnum } from '../../../../domain/enums/audit-event-type.enum';

/** Convertit une ligne Prisma (AuditLogTable) en entité de domaine et inversement. */
export class AuditLogPersistenceMapper {
  static toDomain(row: AuditLogTable): AuditLogEntity {
    return new AuditLogEntity({
      auditId: row.audit_id,
      publicId: row.public_id,
      actorId: row.actor_id ?? undefined,
      eventType: row.event_type as AuditEventTypeEnum,
      entity: row.entity,
      entityId: row.entity_id ?? undefined,
      result: row.result ? (row.result as AuditResultEnum) : undefined,
      details: row.details ?? undefined,
      createdAt: row.created_at,
    });
  }

  static toPersistence(entry: AuditLogEntity): Prisma.AuditLogTableUncheckedCreateInput {
    return {
      public_id: entry.publicId,
      actor_id: entry.actorId ?? null,
      event_type: entry.eventType,
      entity: entry.entity,
      entity_id: entry.entityId ?? null,
      result: entry.result ?? null,
      details: entry.details ?? null,
    };
  }
}
