import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCampaignUseCase } from '../../../application/use_case/campaign/create-campaign.usecase';
import { ListCampaignsUseCase } from '../../../application/use_case/campaign/list-campaigns.usecase';
import { CreateCampaignRequestDto } from '../dto/campaign-request.dto';
import { CampaignHttpMapper } from '../../../application/mapper/campaign-http.mapper';

@Controller('campaigns')
export class CampaignControllerAdapter {
  constructor(
    private readonly create: CreateCampaignUseCase,
    private readonly list: ListCampaignsUseCase,
  ) {}

  @Post()
  async createCampaign(@Body() dto: CreateCampaignRequestDto) {
    const campaign = await this.create.execute({
      title: dto.title,
      content: dto.content,
      channel: dto.channel,
      targetAudience: dto.targetAudience,
      targetVillage: dto.targetVillage,
      startDate: new Date(dto.startDate),
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      createdBy: dto.createdBy,
    });
    return CampaignHttpMapper.toResponse(campaign);
  }

  @Get()
  async findAll() {
    const campaigns = await this.list.execute();
    return campaigns.map(CampaignHttpMapper.toResponse);
  }
}
