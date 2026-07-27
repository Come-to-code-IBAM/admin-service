import { Controller, Get } from '@nestjs/common';
import { ListEleveursUseCase } from '../../../application/use_case/eleveur/list-eleveurs.usecase';

@Controller('eleveurs')
export class EleveurControllerAdapter {
  constructor(private readonly list: ListEleveursUseCase) {}

  @Get()
  async findAll() {
    throw new Error('Not implemented');
  }
}
