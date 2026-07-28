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
  readonly auditId?: number;
  readonly publicId!: string;
  readonly actorId?: string;
  readonly eventType!: AuditEventTypeEnum;
  readonly entity!: string;
  readonly entityId?: string;
  readonly result?: AuditResultEnum;
  readonly details?: string;
  readonly createdAt?: Date;

  constructor(props: AuditLogProps) {
    Object.assign(this, props);
  }
}
