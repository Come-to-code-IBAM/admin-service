import { AlertPlanEnum } from '../../../domain/enums/alert.enum';

export class NotifyConflictRequestDto {
  zoneId!: string;
  location?: string;
  timestamp!: string;
  plan!: AlertPlanEnum;
}
