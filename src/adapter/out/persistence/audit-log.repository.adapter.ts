import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { AuditLogRepositoryPort } from '../../../domain/port/out/audit-log.repository.port';
import { AuditLogEntity } from '../../../domain/entities/audit-log.entity';

@Injectable()
export class AuditLogRepositoryAdapter implements AuditLogRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}
  async append(entry: AuditLogEntity): Promise<AuditLogEntity> { throw new Error('Not implemented'); }
  async findAll(): Promise<AuditLogEntity[]> { throw new Error('Not implemented'); }
}
