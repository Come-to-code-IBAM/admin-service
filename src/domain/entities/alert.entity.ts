import { AlertTypeEnum, AlertStatusEnum, AlertPlanEnum, AlertDeliveryEnum } from '../enums/alert.enum';

export interface AlertProps {
  id?: string;
  publicId: string;
  type: AlertTypeEnum;
  relatedId?: string;
  location?: string;
  recipients?: string;
  plan?: AlertPlanEnum;
  deliveryMethod: AlertDeliveryEnum;
  status: AlertStatusEnum;
  sentAt?: Date;
  createdAt?: Date;
}

/** Trace d'une alerte (vol ou conflit), avec le chemin de cascade utilisé. */
export class AlertEntity {
  constructor(props: AlertProps) {
    Object.assign(this, props);
  }
}
