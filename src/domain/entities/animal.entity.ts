import { AnimalStatusEnum } from '../enums/animal-status.enum';
import { AnimalSpeciesEnum } from '../enums/animal-species.enum';

export interface AnimalProps {
  id?: string;
  publicId: string;
  ownerId: string;
  signatureId?: string;
  species: AnimalSpeciesEnum;
  breed?: string;
  ageEstimate?: number;
  distinctiveSign?: string;
  tagCode?: string;
  status: AnimalStatusEnum;
  village?: string;
  createdAt?: Date;
}

/** Fiche animal : le cœur du carnet numérique. */
export class AnimalEntity {
  readonly id?: string;
  readonly publicId!: string;
  readonly ownerId!: string;
  readonly signatureId?: string;
  readonly species!: AnimalSpeciesEnum;
  readonly breed?: string;
  readonly ageEstimate?: number;
  readonly distinctiveSign?: string;
  readonly tagCode?: string;
  readonly status!: AnimalStatusEnum;
  readonly village?: string;
  readonly createdAt?: Date;

  constructor(props: AnimalProps) {
    Object.assign(this, props);
  }

  /** Un animal signalé volé ne peut plus être revendu légitimement. */
  isStolen(): boolean {
    throw new Error('Not implemented');
  }
}
