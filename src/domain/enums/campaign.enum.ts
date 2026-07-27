/** Canal d'une campagne de sensibilisation. */
export enum CampaignChannelEnum {
  SMS = 'sms',
  IN_APP = 'in_app',
  BOTH = 'both',
}

/** Cible d'une campagne. */
export enum CampaignAudienceEnum {
  ELEVEUR = 'eleveur',
  AGRICULTEUR = 'agriculteur',
  ALL = 'all',
}

/** Statut d'une campagne. */
export enum CampaignStatusEnum {
  DRAFT = 'draft',
  ACTIVE = 'active',
  ENDED = 'ended',
}
