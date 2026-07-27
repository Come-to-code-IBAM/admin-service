/** Type d'alerte. */
export enum AlertTypeEnum {
  THEFT = 'theft',
  CONFLICT = 'conflict',
}

/** Statut d'un signalement / alerte. */
export enum AlertStatusEnum {
  OPEN = 'open',
  RESOLVED = 'resolved',
  FALSE = 'false',
}

/** Chemin de la cascade d'alerte de conflit (A/B/C, + D pour LoRa à terme). */
export enum AlertPlanEnum {
  A = 'A',
  B = 'B',
  C = 'C',
}

/** Canal de livraison d'une alerte. */
export enum AlertDeliveryEnum {
  INTERNET = 'internet',
  SMS = 'sms',
  CALL = 'call',
}
