import { AnimalEntity } from '../../../domain/entities/animal.entity';
import { AnimalRepositoryPort } from '../../../domain/port/out/animal.repository.port';
import { AuditLogRepositoryPort } from '../../../domain/port/out/audit-log.repository.port';
import {
  PublicIdGeneratorPort,
  PublicIdPrefix,
} from '../../../domain/port/in/generate-public-id/generator-public-id.port';
import { EnrollAnimalValidator } from '../../../domain/services/validators/animal/enroll-animal.validator';
import { AnimalSpeciesEnum } from '../../../domain/enums/animal-species.enum';
import { AnimalStatusEnum } from '../../../domain/enums/animal-status.enum';
import { AuditLogEntity } from '../../../domain/entities/audit-log.entity';
import { AuditEventTypeEnum, AuditResultEnum } from '../../../domain/enums/audit-event-type.enum';

export interface EnrollAnimalCommand {
  ownerId: string;
  species: AnimalSpeciesEnum;
  breed?: string;
  ageEstimate?: number;
  distinctiveSign?: string;
  signatureId?: string;
  enrolledByAgentId: string;
}

/** Enrôle un nouvel animal (réservé aux agents habilités). */
export class EnrollAnimalUseCase {
  constructor(
    private readonly animalRepo: AnimalRepositoryPort,
    private readonly auditRepo: AuditLogRepositoryPort,
    private readonly publicId: PublicIdGeneratorPort,
    private readonly validator: EnrollAnimalValidator,
  ) {}

  async execute(command: EnrollAnimalCommand): Promise<AnimalEntity> {
    const existing = command.signatureId
      ? await this.animalRepo.findBySignatureId(command.signatureId)
      : null;

    const candidate = new AnimalEntity({
      publicId: this.publicId.generate(PublicIdPrefix.ANIMAL),
      ownerId: command.ownerId,
      signatureId: command.signatureId,
      species: command.species,
      breed: command.breed,
      ageEstimate: command.ageEstimate,
      distinctiveSign: command.distinctiveSign,
      status: AnimalStatusEnum.ACTIVE,
    });

    this.validator.validate(candidate, existing);

    const saved = await this.animalRepo.save(candidate);

    await this.auditRepo.append(
      new AuditLogEntity({
        publicId: this.publicId.generate(PublicIdPrefix.AUDIT),
        actorId: command.enrolledByAgentId,
        eventType: AuditEventTypeEnum.ANIMAL_ENROLLED,
        entity: 'Animal',
        entityId: saved.publicId,
        result: AuditResultEnum.SUCCESS,
      }),
    );

    return saved;
  }
}
