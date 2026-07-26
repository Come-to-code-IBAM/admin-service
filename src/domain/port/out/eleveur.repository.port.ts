import { EleveurEntity } from '../../entities/eleveur.entity';

export interface EleveurRepositoryPort {
  save(eleveur: EleveurEntity): Promise<EleveurEntity>;
  findByPublicId(publicId: string): Promise<EleveurEntity | null>;
  findByPhone(phone: string): Promise<EleveurEntity | null>;
  findAll(): Promise<EleveurEntity[]>;
}
export const ELEVEUR_REPOSITORY = Symbol('EleveurRepositoryPort');
