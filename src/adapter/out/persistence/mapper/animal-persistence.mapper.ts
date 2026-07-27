import { AnimalEntity } from '../../../../domain/entities/animal.entity';

/** Convertit une ligne Prisma en entité de domaine et inversement. */
export class AnimalPersistenceMapper {
  static toDomain(row: Record<string, unknown>): AnimalEntity {
    throw new Error('Not implemented');
  }
  static toPersistence(animal: AnimalEntity): Record<string, unknown> {
    throw new Error('Not implemented');
  }
}
