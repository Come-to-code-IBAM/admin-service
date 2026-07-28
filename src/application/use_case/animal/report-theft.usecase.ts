import { TheftReportEntity } from '../../../domain/entities/theft-report.entity';
import { AnimalRepositoryPort } from '../../../domain/port/out/animal.repository.port';
import { AlertRepositoryPort } from '../../../domain/port/out/alert.repository.port';
import { AuditLogRepositoryPort } from '../../../domain/port/out/audit-log.repository.port';
import {
  PublicIdGeneratorPort,
  PublicIdPrefix,
} from '../../../domain/port/in/generate-public-id/generator-public-id.port';
import { AnimalStatusEnum } from '../../../domain/enums/animal-status.enum';
import { AlertStatusEnum } from '../../../domain/enums/alert.enum';
import { AuditLogEntity } from '../../../domain/entities/audit-log.entity';
import { AuditEventTypeEnum, AuditResultEnum } from '../../../domain/enums/audit-event-type.enum';
import { BusinessError } from '../../../domain/errors/business.error';
import { DomainErrorCode } from '../../../domain/errors/codes.error';

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
    const animal = await this.animalRepo.findByPublicId(command.animalId);
    if (!animal) {
      throw new BusinessError(DomainErrorCode.ANIMAL_NOT_FOUND, `Animal introuvable (${command.animalId}).`);
    }

    const report = new TheftReportEntity({
      publicId: this.publicId.generate(PublicIdPrefix.THEFT),
      animalId: animal.publicId,
      reportedByEleveur: command.reportedByEleveur,
      reportedByAgent: command.reportedByAgent,
      location: command.location,
      circumstances: command.circumstances,
      status: AlertStatusEnum.OPEN,
      reportDate: new Date(),
    });

    const saved = await this.alertRepo.saveTheftReport(report);
    await this.animalRepo.updateStatus(animal.publicId, AnimalStatusEnum.STOLEN);

    await this.auditRepo.append(
      new AuditLogEntity({
        publicId: this.publicId.generate(PublicIdPrefix.AUDIT),
        actorId: command.reportedByAgent ?? command.reportedByEleveur,
        eventType: AuditEventTypeEnum.THEFT_REPORTED,
        entity: 'Animal',
        entityId: animal.publicId,
        result: AuditResultEnum.SUCCESS,
      }),
    );

    return saved;
  }
}
