import { AlertStatusEnum } from '../enums/alert.enum';

export interface TheftReportProps {
  id?: string;
  publicId: string;
  animalId: string;
  reportedByEleveur?: string;
  reportedByAgent?: string;
  location?: string;
  circumstances?: string;
  status: AlertStatusEnum;
  reportDate: Date;
  createdAt?: Date;
}

/** Signalement de vol d'un animal. */
export class TheftReportEntity {
  constructor(props: TheftReportProps) {
    Object.assign(this, props);
  }
}
