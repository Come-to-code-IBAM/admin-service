import { TheftReportEntity } from '../../../domain/entities/theft-report.entity';
import { AnimalRepositoryPort } from '../../../domain/port/out/animal.repository.port';
import { AlertRepositoryPort } from '../../../domain/port/out/alert.repository.port';
import { AuditLogRepositoryPort } from '../../../domain/port/out/audit-log.repository.port';
import { PublicIdGeneratorPort } from '../../../domain/port/in/generate-public-id/generator-public-id.port';

export interface ReportTheftCommand {
  animalId: string;
  reportedByEleveur?: string;
  reportedByAgent?: string;
  location?: string;
  circumstances?: string;
}

/** Signale le vol d'un animal (passe son statut à "stolen"). */
export class ReportTheftUseCase {
  constructor(
    private readonly animalRepo: AnimalRepositoryPort,
    private readonly alertRepo: AlertRepositoryPort,
    private readonly auditRepo: AuditLogRepositoryPort,
    private readonly publicId: PublicIdGeneratorPort,
  ) {}

  async execute(command: ReportTheftCommand): Promise<TheftReportEntity> {
    throw new Error('Not implemented');
  }
}
