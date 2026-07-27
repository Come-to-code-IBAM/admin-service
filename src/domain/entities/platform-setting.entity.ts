export interface PlatformSettingProps {
  id?: string;
  publicId: string;
  settingKey: string;
  settingValue: string;
  description?: string;
  updatedBy?: string;
  updatedAt?: Date;
}

/** Paramètre global de la plateforme (clé/valeur). */
export class PlatformSettingEntity {
  constructor(props: PlatformSettingProps) {
    Object.assign(this, props);
  }
}
