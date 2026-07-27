import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './infrastructure/config/configuration';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { AnimalModule } from './adapter/in/animal.module';
import { AlertModule } from './adapter/in/alert.module';
import { CampaignModule } from './adapter/in/campaign.module';
import { EleveurModule } from './adapter/in/eleveur.module';
import { AuthModule } from './adapter/in/auth.module';
import { HealthModule } from './adapter/in/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PrismaModule,
    AnimalModule,
    AlertModule,
    CampaignModule,
    EleveurModule,
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
