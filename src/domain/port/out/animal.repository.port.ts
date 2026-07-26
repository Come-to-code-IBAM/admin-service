import { AnimalEntity } from '../../entities/animal.entity';
import { AnimalStatusEnum } from '../../enums/animal-status.enum';

export interface AnimalRepositoryPort {
  save(animal: AnimalEntity): Promise<AnimalEntity>;
  findByPublicId(publicId: string): Promise<AnimalEntity | null>;
  findBySignatureId(signatureId: string): Promise<AnimalEntity | null>;
  findByOwner(ownerId: string): Promise<AnimalEntity[]>;
  updateStatus(publicId: string, status: AnimalStatusEnum): Promise<AnimalEntity>;
  findAll(): Promise<AnimalEntity[]>;
}
export const ANIMAL_REPOSITORY = Symbol('AnimalRepositoryPort');
