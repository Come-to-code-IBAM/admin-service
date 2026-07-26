import { AnimalEntity } from '../../../entities/animal.entity';

/** Règles de validation à l'enrôlement d'un animal (domaine pur). */
export class EnrollAnimalValidator {
  /** Vérifie l'unicité de la signature et la cohérence des champs. */
  validate(animal: AnimalEntity, existing: AnimalEntity | null): void {
    throw new Error('Not implemented');
  }
}
