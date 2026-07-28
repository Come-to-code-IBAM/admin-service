import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { AlertRepositoryPort } from '../../../domain/port/out/alert.repository.port';
import { AlertEntity } from '../../../domain/entities/alert.entity';
import { TheftReportEntity } from '../../../domain/entities/theft-report.entity';
import { AlertPersistenceMapper } from './mapper/alert-persistence.mapper';
import { TheftReportPersistenceMapper } from './mapper/theft-report-persistence.mapper';

@Injectable()
export class AlertRepositoryAdapter implements AlertRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async saveAlert(alert: AlertEntity): Promise<AlertEntity> {
    const row = await this.prisma.alertTable.create({
      data: AlertPersistenceMapper.toPersistence(alert),
    });
    return AlertPersistenceMapper.toDomain(row);
  }

  async listAlerts(): Promise<AlertEntity[]> {
    const rows = await this.prisma.alertTable.findMany();
    return rows.map(AlertPersistenceMapper.toDomain);
  }

  async saveTheftReport(report: TheftReportEntity): Promise<TheftReportEntity> {
    const row = await this.prisma.theftReportTable.create({
      data: TheftReportPersistenceMapper.toPersistence(report),
    });
    return TheftReportPersistenceMapper.toDomain(row);
  }

  async listTheftReports(): Promise<TheftReportEntity[]> {
    const rows = await this.prisma.theftReportTable.findMany();
    return rows.map(TheftReportPersistenceMapper.toDomain);
  }
}
