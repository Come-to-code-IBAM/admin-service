import { AnimalTable, Prisma } from '@prisma/client';
import { AnimalEntity } from '../../../../domain/entities/animal.entity';
import { AnimalSpeciesEnum } from '../../../../domain/enums/animal-species.enum';
import { AnimalStatusEnum } from '../../../../domain/enums/animal-status.enum';

/** Convertit une ligne Prisma en entité de domaine et inversement. */
export class AnimalPersistenceMapper {
  static toDomain(row: AnimalTable): AnimalEntity {
    return new AnimalEntity({
      id: row.id,
      publicId: row.public_id,
      ownerId: row.owner_id,
      signatureId: row.signature_id ?? undefined,
      species: row.species as AnimalSpeciesEnum,
      breed: row.breed ?? undefined,
      ageEstimate: row.age_estimate ?? undefined,
      distinctiveSign: row.distinctive_sign ?? undefined,
      tagCode: row.tag_code ?? undefined,
      status: row.status as AnimalStatusEnum,
      village: row.village ?? undefined,
      createdAt: row.created_at,
    });
  }

  static toPersistence(animal: AnimalEntity): Prisma.AnimalTableUncheckedCreateInput {
    return {
      public_id: animal.publicId,
      owner_id: animal.ownerId,
      signature_id: animal.signatureId ?? null,
      species: animal.species,
      breed: animal.breed ?? null,
      age_estimate: animal.ageEstimate ?? null,
      distinctive_sign: animal.distinctiveSign ?? null,
      tag_code: animal.tagCode ?? null,
      status: animal.status,
      village: animal.village ?? null,
    };
  }
}
