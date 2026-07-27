import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCampaignUseCase } from '../../../application/use_case/campaign/create-campaign.usecase';
import { ListCampaignsUseCase } from '../../../application/use_case/campaign/list-campaigns.usecase';
import { CreateCampaignRequestDto } from '../dto/campaign-request.dto';

@Controller('campaigns')
export class CampaignControllerAdapter {
  constructor(
    private readonly create: CreateCampaignUseCase,
    private readonly list: ListCampaignsUseCase,
  ) {}

  @Post()
  async createCampaign(@Body() dto: CreateCampaignRequestDto) {
    throw new Error('Not implemented');
  }

  @Get()
  async findAll() {
    throw new Error('Not implemented');
  }
}
