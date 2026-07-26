export interface EleveurProps {
  id?: string;
  publicId: string;
  name: string;
  phoneNumber: string;
  village?: string;
  isHerder: boolean;
  registeredBy?: string;
  createdAt?: Date;
}

/** Éleveur : propriétaire de bétail et/ou berger. */
export class EleveurEntity {
  readonly id?: string;
  readonly publicId!: string;
  readonly name!: string;
  readonly phoneNumber!: string;
  readonly village?: string;
  readonly isHerder!: boolean;
  readonly registeredBy?: string;
  readonly createdAt?: Date;

  constructor(props: EleveurProps) {
    Object.assign(this, props);
  }
}
