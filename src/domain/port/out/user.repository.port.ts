import { UserEntity } from '../../entities/user.entity';

export interface UserRepositoryPort {
  save(user: UserEntity): Promise<UserEntity>;
  findByPublicId(publicId: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
}
export const USER_REPOSITORY = Symbol('UserRepositoryPort');
