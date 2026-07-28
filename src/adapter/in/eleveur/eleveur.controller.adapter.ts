import { Controller, Get } from '@nestjs/common';
import { ListEleveursUseCase } from '../../../application/use_case/eleveur/list-eleveurs.usecase';

@Controller('eleveurs')
export class EleveurControllerAdapter {
  constructor(private readonly list: ListEleveursUseCase) {}

  @Get()
  async findAll() {
    const eleveurs = await this.list.execute();
    return eleveurs.map((eleveur) => ({
      publicId: eleveur.publicId,
      name: eleveur.name,
      phoneNumber: eleveur.phoneNumber,
      village: eleveur.village ?? null,
      isHerder: eleveur.isHerder,
      createdAt: eleveur.createdAt ?? null,
    }));
  }
}
