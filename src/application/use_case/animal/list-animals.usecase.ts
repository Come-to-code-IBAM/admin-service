import { AnimalEntity } from '../../../domain/entities/animal.entity';
import { AnimalRepositoryPort } from '../../../domain/port/out/animal.repository.port';

/** Liste les animaux (filtrage éventuel par propriétaire). */
export class ListAnimalsUseCase {
  constructor(private readonly animalRepo: AnimalRepositoryPort) {}

  async execute(ownerId?: string): Promise<AnimalEntity[]> {
    return ownerId ? this.animalRepo.findByOwner(ownerId) : this.animalRepo.findAll();
  }
}
