import { EleveurEntity } from '../../../domain/entities/eleveur.entity';
import { EleveurRepositoryPort } from '../../../domain/port/out/eleveur.repository.port';

export class ListEleveursUseCase {
  constructor(private readonly eleveurRepo: EleveurRepositoryPort) {}
  async execute(): Promise<EleveurEntity[]> {
    return this.eleveurRepo.findAll();
  }
}
