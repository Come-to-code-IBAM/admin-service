import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EnrollAnimalUseCase } from '../../../application/use_case/animal/enroll-animal.usecase';
import { VerifyAnimalUseCase } from '../../../application/use_case/animal/verify-animal.usecase';
import { ReportTheftUseCase } from '../../../application/use_case/animal/report-theft.usecase';
import { ListAnimalsUseCase } from '../../../application/use_case/animal/list-animals.usecase';
import { EnrollAnimalRequestDto, ReportTheftRequestDto } from '../dto/animal-request.dto';

@Controller('animals')
export class AnimalControllerAdapter {
  constructor(
    private readonly enroll: EnrollAnimalUseCase,
    private readonly verify: VerifyAnimalUseCase,
    private readonly reportTheft: ReportTheftUseCase,
    private readonly list: ListAnimalsUseCase,
  ) {}

  @Post('enroll')
  async enrollAnimal(@Body() dto: EnrollAnimalRequestDto) {
    throw new Error('Not implemented');
  }

  @Post('verify')
  async verifyAnimal(@Body() body: { signatureId: string }) {
    throw new Error('Not implemented');
  }

  @Post(':publicId/theft')
  async report(@Param('publicId') publicId: string, @Body() dto: ReportTheftRequestDto) {
    throw new Error('Not implemented');
  }

  @Get()
  async findAll(@Query('ownerId') ownerId?: string) {
    throw new Error('Not implemented');
  }
}
