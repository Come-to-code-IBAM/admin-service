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
  readonly id?: string;
  readonly publicId!: string;
  readonly animalId!: string;
  readonly reportedByEleveur?: string;
  readonly reportedByAgent?: string;
  readonly location?: string;
  readonly circumstances?: string;
  readonly status!: AlertStatusEnum;
  readonly reportDate!: Date;
  readonly createdAt?: Date;

  constructor(props: TheftReportProps) {
    Object.assign(this, props);
  }
}
