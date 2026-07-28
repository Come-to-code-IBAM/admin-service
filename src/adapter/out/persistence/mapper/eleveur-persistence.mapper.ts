import { EleveurTable, Prisma } from '@prisma/client';
import { EleveurEntity } from '../../../../domain/entities/eleveur.entity';

export class EleveurPersistenceMapper {
  static toDomain(row: EleveurTable): EleveurEntity {
    return new EleveurEntity({
      id: row.id,
      publicId: row.public_id,
      name: row.name,
      phoneNumber: row.phone_number,
      village: row.village ?? undefined,
      isHerder: row.is_herder,
      registeredBy: row.registered_by ?? undefined,
      createdAt: row.created_at,
    });
  }

  static toPersistence(eleveur: EleveurEntity): Prisma.EleveurTableUncheckedCreateInput {
    return {
      public_id: eleveur.publicId,
      name: eleveur.name,
      phone_number: eleveur.phoneNumber,
      village: eleveur.village ?? null,
      is_herder: eleveur.isHerder,
      registered_by: eleveur.registeredBy ?? null,
    };
  }
}
