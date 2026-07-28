import { AnimalEntity } from '../../../entities/animal.entity';
import { BusinessError } from '../../../errors/business.error';
import { DomainErrorCode } from '../../../errors/codes.error';

/** Règles de validation à l'enrôlement d'un animal (domaine pur). */
export class EnrollAnimalValidator {
  /** Vérifie l'unicité de la signature et la cohérence des champs. */
  validate(animal: AnimalEntity, existing: AnimalEntity | null): void {
    if (existing) {
      throw new BusinessError(
        DomainErrorCode.ANIMAL_ALREADY_ENROLLED,
        `Un animal est déjà enrôlé avec cette signature (${existing.publicId}).`,
      );
    }
    if (!animal.ownerId) {
      throw new BusinessError(DomainErrorCode.VALIDATION_ERROR, "Le propriétaire de l'animal est requis.");
    }
    if (!animal.species) {
      throw new BusinessError(DomainErrorCode.VALIDATION_ERROR, "L'espèce de l'animal est requise.");
    }
  }
}
