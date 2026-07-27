import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { AlertRepositoryPort } from '../../../domain/port/out/alert.repository.port';
import { AlertEntity } from '../../../domain/entities/alert.entity';
import { TheftReportEntity } from '../../../domain/entities/theft-report.entity';

@Injectable()
export class AlertRepositoryAdapter implements AlertRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}
  async saveAlert(a: AlertEntity): Promise<AlertEntity> { throw new Error('Not implemented'); }
  async listAlerts(): Promise<AlertEntity[]> { throw new Error('Not implemented'); }
  async saveTheftReport(r: TheftReportEntity): Promise<TheftReportEntity> { throw new Error('Not implemented'); }
  async listTheftReports(): Promise<TheftReportEntity[]> { throw new Error('Not implemented'); }
}
