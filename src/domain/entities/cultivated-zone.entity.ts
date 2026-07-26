export interface CultivatedZoneProps {
  id?: string;
  publicId: string;
  ownerId?: string;
  polygon: unknown; // GeoJSON
  cropType?: string;
  harvestPeriod?: string;
  declaredBy: string;
  createdAt?: Date;
}

/** Zone cultivée déclarée (module conflit). */
export class CultivatedZoneEntity {
  constructor(props: CultivatedZoneProps) {
    Object.assign(this, props);
  }
}
