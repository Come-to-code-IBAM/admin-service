import { Module } from '@nestjs/common';
import { AlertControllerAdapter } from './alert/alert.controller.adapter';
import { NotifyConflictUseCase } from '../../application/use_case/alert/notify-conflict.usecase';
import { ListAlertsUseCase } from '../../application/use_case/alert/list-alerts.usecase';
import { AlertRepositoryAdapter } from '../out/persistence/alert.repository.adapter';
import { NanoidGeneratorAdapter } from '../out/public-id/nanoid-generator.adapter';
import { ALERT_REPOSITORY } from '../../domain/port/out/alert.repository.port';
import { PUBLIC_ID_GENERATOR } from '../../domain/port/in/generate-public-id/generator-public-id.port';

@Module({
  controllers: [AlertControllerAdapter],
  providers: [
    { provide: ALERT_REPOSITORY, useClass: AlertRepositoryAdapter },
    { provide: PUBLIC_ID_GENERATOR, useClass: NanoidGeneratorAdapter },
    NotifyConflictUseCase,
    ListAlertsUseCase,
  ],
})
export class AlertModule {}
