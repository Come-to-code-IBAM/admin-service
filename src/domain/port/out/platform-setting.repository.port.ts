import { PlatformSettingEntity } from '../../entities/platform-setting.entity';

export interface PlatformSettingRepositoryPort {
  get(key: string): Promise<PlatformSettingEntity | null>;
  set(setting: PlatformSettingEntity): Promise<PlatformSettingEntity>;
  findAll(): Promise<PlatformSettingEntity[]>;
}
export const PLATFORM_SETTING_REPOSITORY = Symbol('PlatformSettingRepositoryPort');
