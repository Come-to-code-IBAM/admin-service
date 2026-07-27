import { Module } from '@nestjs/common';
import { AnimalControllerAdapter } from './animal/animal.controller.adapter';
import { EnrollAnimalUseCase } from '../../application/use_case/animal/enroll-animal.usecase';
import { VerifyAnimalUseCase } from '../../application/use_case/animal/verify-animal.usecase';
import { ReportTheftUseCase } from '../../application/use_case/animal/report-theft.usecase';
import { ListAnimalsUseCase } from '../../application/use_case/animal/list-animals.usecase';
import { AnimalRepositoryAdapter } from '../out/persistence/animal.repository.adapter';
import { AlertRepositoryAdapter } from '../out/persistence/alert.repository.adapter';
import { AuditLogRepositoryAdapter } from '../out/persistence/audit-log.repository.adapter';
import { NanoidGeneratorAdapter } from '../out/public-id/nanoid-generator.adapter';
import { EnrollAnimalValidator } from '../../domain/services/validators/animal/enroll-animal.validator';
import { ANIMAL_REPOSITORY } from '../../domain/port/out/animal.repository.port';
import { ALERT_REPOSITORY } from '../../domain/port/out/alert.repository.port';
import { AUDIT_LOG_REPOSITORY } from '../../domain/port/out/audit-log.repository.port';
import { PUBLIC_ID_GENERATOR } from '../../domain/port/in/generate-public-id/generator-public-id.port';

/**
 * Câblage du module Animal : les ports du domaine sont liés à leurs
 * adaptateurs concrets. C'est ici que l'inversion de dépendance se matérialise.
 */
@Module({
  controllers: [AnimalControllerAdapter],
  providers: [
    { provide: ANIMAL_REPOSITORY, useClass: AnimalRepositoryAdapter },
    { provide: ALERT_REPOSITORY, useClass: AlertRepositoryAdapter },
    { provide: AUDIT_LOG_REPOSITORY, useClass: AuditLogRepositoryAdapter },
    { provide: PUBLIC_ID_GENERATOR, useClass: NanoidGeneratorAdapter },
    EnrollAnimalValidator,
    EnrollAnimalUseCase,
    VerifyAnimalUseCase,
    ReportTheftUseCase,
    ListAnimalsUseCase,
  ],
})
export class AnimalModule {}
