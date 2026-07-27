import { EleveurEntity } from '../../../../domain/entities/eleveur.entity';

export class EleveurPersistenceMapper {
  static toDomain(row: Record<string, unknown>): EleveurEntity {
    throw new Error('Not implemented');
  }
  static toPersistence(e: EleveurEntity): Record<string, unknown> {
    throw new Error('Not implemented');
  }
}
