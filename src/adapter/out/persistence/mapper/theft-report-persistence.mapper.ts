import { TheftReportTable, Prisma } from '@prisma/client';
import { TheftReportEntity } from '../../../../domain/entities/theft-report.entity';
import { AlertStatusEnum } from '../../../../domain/enums/alert.enum';

/** Convertit une ligne Prisma (TheftReportTable) en entité de domaine et inversement. */
export class TheftReportPersistenceMapper {
  static toDomain(row: TheftReportTable): TheftReportEntity {
    return new TheftReportEntity({
      id: row.id,
      publicId: row.public_id,
      animalId: row.animal_id,
      reportedByEleveur: row.reported_by_eleveur ?? undefined,
      reportedByAgent: row.reported_by_agent ?? undefined,
      location: row.location ?? undefined,
      circumstances: row.circumstances ?? undefined,
      status: row.status as AlertStatusEnum,
      reportDate: row.report_date,
      createdAt: row.created_at,
    });
  }

  static toPersistence(report: TheftReportEntity): Prisma.TheftReportTableUncheckedCreateInput {
    return {
      public_id: report.publicId,
      animal_id: report.animalId,
      reported_by_eleveur: report.reportedByEleveur ?? null,
      reported_by_agent: report.reportedByAgent ?? null,
      location: report.location ?? null,
      circumstances: report.circumstances ?? null,
      status: report.status,
      report_date: report.reportDate,
    };
  }
}
