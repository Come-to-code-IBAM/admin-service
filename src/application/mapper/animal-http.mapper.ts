import { AnimalEntity } from '../../domain/entities/animal.entity';

/** Convertit une entité Animal en objet de réponse HTTP. */
export class AnimalHttpMapper {
  static toResponse(animal: AnimalEntity): Record<string, unknown> {
    return {
      publicId: animal.publicId,
      ownerId: animal.ownerId,
      species: animal.species,
      breed: animal.breed ?? null,
      ageEstimate: animal.ageEstimate ?? null,
      distinctiveSign: animal.distinctiveSign ?? null,
      tagCode: animal.tagCode ?? null,
      status: animal.status,
      village: animal.village ?? null,
      createdAt: animal.createdAt ?? null,
    };
  }
}
