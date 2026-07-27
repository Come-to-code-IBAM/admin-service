import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotifyConflictUseCase } from '../../../application/use_case/alert/notify-conflict.usecase';
import { ListAlertsUseCase } from '../../../application/use_case/alert/list-alerts.usecase';
import { NotifyConflictRequestDto } from '../dto/alert-request.dto';

@Controller('alerts')
export class AlertControllerAdapter {
  constructor(
    private readonly notifyConflict: NotifyConflictUseCase,
    private readonly listAlerts: ListAlertsUseCase,
  ) {}

  @Post('conflict')
  async conflict(@Body() dto: NotifyConflictRequestDto) {
    throw new Error('Not implemented');
  }

  @Get()
  async findAll() {
    throw new Error('Not implemented');
  }
}
