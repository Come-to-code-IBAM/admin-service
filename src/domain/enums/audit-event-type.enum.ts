/** Types d'événements tracés dans le journal d'audit. */
export enum AuditEventTypeEnum {
  ANIMAL_ENROLLED = 'animal_enrolled',
  THEFT_REPORTED = 'theft_reported',
  THEFT_RESOLVED = 'theft_resolved',
  ZONE_DECLARED = 'zone_declared',
  CAMPAIGN_CREATED = 'campaign_created',
  USER_CREATED = 'user_created',
  SETTING_UPDATED = 'setting_updated',
}

/** Résultat d'une action auditée. */
export enum AuditResultEnum {
  SUCCESS = 'success',
  FAILURE = 'failure',
}
