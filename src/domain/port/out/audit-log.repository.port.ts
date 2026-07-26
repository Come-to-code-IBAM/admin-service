import { AuditLogEntity } from '../../entities/audit-log.entity';

export interface AuditLogRepositoryPort {
  append(entry: AuditLogEntity): Promise<AuditLogEntity>;
  findAll(): Promise<AuditLogEntity[]>;
}
export const AUDIT_LOG_REPOSITORY = Symbol('AuditLogRepositoryPort');
