import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotifyConflictUseCase } from '../../../application/use_case/alert/notify-conflict.usecase';
import { ListAlertsUseCase } from '../../../application/use_case/alert/list-alerts.usecase';
import { NotifyConflictRequestDto } from '../dto/alert-request.dto';
import { AlertHttpMapper } from '../../../application/mapper/alert-http.mapper';

@Controller('alerts')
export class AlertControllerAdapter {
  constructor(
    private readonly notifyConflict: NotifyConflictUseCase,
    private readonly listAlerts: ListAlertsUseCase,
  ) {}

  @Post('conflict')
  async conflict(@Body() dto: NotifyConflictRequestDto) {
    const alert = await this.notifyConflict.execute({
      zoneId: dto.zoneId,
      location: dto.location,
      timestamp: new Date(dto.timestamp),
      plan: dto.plan,
    });
    return AlertHttpMapper.toResponse(alert);
  }

  @Get()
  async findAll() {
    const alerts = await this.listAlerts.execute();
    return alerts.map(AlertHttpMapper.toResponse);
  }
}
