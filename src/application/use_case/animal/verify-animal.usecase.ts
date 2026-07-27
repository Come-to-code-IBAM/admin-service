import { AnimalEntity } from '../../../domain/entities/animal.entity';
import { AnimalRepositoryPort } from '../../../domain/port/out/animal.repository.port';

export interface VerifyAnimalResult {
  status: 'recognized' | 'stolen' | 'unknown';
  animal: AnimalEntity | null;
}

/** Vérifie un animal par sa signature de mufle (comparaison déléguée). */
export class VerifyAnimalUseCase {
  constructor(private readonly animalRepo: AnimalRepositoryPort) {}

  async execute(signatureId: string): Promise<VerifyAnimalResult> {
    throw new Error('Not implemented');
  }
}
