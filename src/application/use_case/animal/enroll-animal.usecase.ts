import { AnimalEntity } from '../../../domain/entities/animal.entity';
import { AnimalRepositoryPort } from '../../../domain/port/out/animal.repository.port';
import { AuditLogRepositoryPort } from '../../../domain/port/out/audit-log.repository.port';
import { PublicIdGeneratorPort } from '../../../domain/port/in/generate-public-id/generator-public-id.port';
import { EnrollAnimalValidator } from '../../../domain/services/validators/animal/enroll-animal.validator';
import { AnimalSpeciesEnum } from '../../../domain/enums/animal-species.enum';

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
    throw new Error('Not implemented');
  }
}
