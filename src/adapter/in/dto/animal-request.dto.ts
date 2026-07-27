import { AnimalSpeciesEnum } from '../../../domain/enums/animal-species.enum';

export class EnrollAnimalRequestDto {
  ownerId!: string;
  species!: AnimalSpeciesEnum;
  breed?: string;
  ageEstimate?: number;
  distinctiveSign?: string;
  signatureId?: string;
}

export class ReportTheftRequestDto {
  location?: string;
  circumstances?: string;
}
