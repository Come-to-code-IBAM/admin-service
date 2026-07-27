import { Module } from '@nestjs/common';
import { EleveurControllerAdapter } from './eleveur/eleveur.controller.adapter';
import { ListEleveursUseCase } from '../../application/use_case/eleveur/list-eleveurs.usecase';
import { EleveurRepositoryAdapter } from '../out/persistence/eleveur.repository.adapter';
import { ELEVEUR_REPOSITORY } from '../../domain/port/out/eleveur.repository.port';

@Module({
  controllers: [EleveurControllerAdapter],
  providers: [
    { provide: ELEVEUR_REPOSITORY, useClass: EleveurRepositoryAdapter },
    ListEleveursUseCase,
  ],
})
export class EleveurModule {}
