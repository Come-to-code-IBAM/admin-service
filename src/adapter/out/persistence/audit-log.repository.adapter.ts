import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { AuditLogRepositoryPort } from '../../../domain/port/out/audit-log.repository.port';
import { AuditLogEntity } from '../../../domain/entities/audit-log.entity';
import { AuditLogPersistenceMapper } from './mapper/audit-log-persistence.mapper';

@Injectable()
export class AuditLogRepositoryAdapter implements AuditLogRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async append(entry: AuditLogEntity): Promise<AuditLogEntity> {
    const row = await this.prisma.auditLogTable.create({
      data: AuditLogPersistenceMapper.toPersistence(entry),
    });
    return AuditLogPersistenceMapper.toDomain(row);
  }

  async findAll(): Promise<AuditLogEntity[]> {
    const rows = await this.prisma.auditLogTable.findMany();
    return rows.map(AuditLogPersistenceMapper.toDomain);
  }
}
