import { AuditEventTypeEnum, AuditResultEnum } from '../enums/audit-event-type.enum';

export interface AuditLogProps {
  auditId?: number;
  publicId: string;
  actorId?: string;
  eventType: AuditEventTypeEnum;
  entity: string;
  entityId?: string;
  result?: AuditResultEnum;
  details?: string;
  createdAt?: Date;
}

/** Entrée du journal d'audit (gouvernance, traçabilité). */
export class AuditLogEntity {
  constructor(props: AuditLogProps) {
    Object.assign(this, props);
  }
}
