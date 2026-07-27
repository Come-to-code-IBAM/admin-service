import { Module } from '@nestjs/common';
import { HealthControllerAdapter } from './health/health.controller.adapter';

@Module({ controllers: [HealthControllerAdapter] })
export class HealthModule {}
