/** Préfixes de public-id par entité, pour des identifiants lisibles. */
export enum PublicIdPrefix {
  ELEVEUR = 'elv',
  AGRICULTEUR = 'agr',
  ANIMAL = 'anm',
  USER = 'usr',
  THEFT = 'thf',
  ZONE = 'zon',
  ALERT = 'alt',
  CAMPAIGN = 'cmp',
  FOOD_ITEM = 'ali',
  AUDIT = 'aud',
}

/**
 * Port de génération d'identifiants publics.
 * L'implémentation (adaptateur) décide de la stratégie (nanoid préfixé).
 */
export interface PublicIdGeneratorPort {
  /** Génère un public-id préfixé, ex. "anm_V1StGXR8Z5". */
  generate(prefix: PublicIdPrefix): string;
}

/** Jeton d'injection pour le port. */
export const PUBLIC_ID_GENERATOR = Symbol('PublicIdGeneratorPort');
