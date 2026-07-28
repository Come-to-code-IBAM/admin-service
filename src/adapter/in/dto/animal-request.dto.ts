import { AnimalSpeciesEnum } from '../../../domain/enums/animal-species.enum';

export class EnrollAnimalRequestDto {
  ownerId!: string;
  species!: AnimalSpeciesEnum;
  breed?: string;
  ageEstimate?: number;
  distinctiveSign?: string;
  signatureId?: string;
  // TODO(1.5): remplacer par l'agent authentifié (req.user) une fois l'auth câblée.
  enrolledByAgentId!: string;
}

export class ReportTheftRequestDto {
  location?: string;
  circumstances?: string;
  reportedByEleveur?: string;
  // TODO(1.5): remplacer par l'agent authentifié (req.user) une fois l'auth câblée.
  reportedByAgent?: string;
}
