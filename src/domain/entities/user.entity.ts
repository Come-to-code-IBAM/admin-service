import { UserRoleEnum } from '../enums/user-role.enum';

export interface UserProps {
  id?: string;
  publicId: string;
  email: string;
  passwordHash: string;
  name: string;
  phoneNumber?: string;
  role: UserRoleEnum;
  organization?: string;
  habilitationCode?: string;
  createdAt?: Date;
}

/** Opérateur de la plateforme : agent ou administrateur. */
export class UserEntity {
  readonly id?: string;
  readonly publicId!: string;
  readonly email!: string;
  readonly passwordHash!: string;
  readonly name!: string;
  readonly phoneNumber?: string;
  readonly role!: UserRoleEnum;
  readonly organization?: string;
  readonly habilitationCode?: string;
  readonly createdAt?: Date;

  constructor(props: UserProps) {
    Object.assign(this, props);
  }

  isAdmin(): boolean {
    throw new Error('Not implemented');
  }
}
