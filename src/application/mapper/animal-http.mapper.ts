import { AnimalEntity } from '../../domain/entities/animal.entity';

/** Convertit une entité Animal en objet de réponse HTTP. */
export class AnimalHttpMapper {
  static toResponse(animal: AnimalEntity): Record<string, unknown> {
    throw new Error('Not implemented');
  }
}
