export interface AgriculteurProps {
  id?: string;
  publicId: string;
  name: string;
  phoneNumber: string;
  village?: string;
  registeredBy?: string;
  createdAt?: Date;
}

/** Agriculteur : propriétaire de zones cultivées (module conflit). */
export class AgriculteurEntity {
  readonly id?: string;
  readonly publicId!: string;
  readonly name!: string;
  readonly phoneNumber!: string;
  readonly village?: string;
  readonly registeredBy?: string;
  readonly createdAt?: Date;

  constructor(props: AgriculteurProps) {
    Object.assign(this, props);
  }
}
