import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EnrollAnimalUseCase } from '../../../application/use_case/animal/enroll-animal.usecase';
import { VerifyAnimalUseCase } from '../../../application/use_case/animal/verify-animal.usecase';
import { ReportTheftUseCase } from '../../../application/use_case/animal/report-theft.usecase';
import { ListAnimalsUseCase } from '../../../application/use_case/animal/list-animals.usecase';
import { EnrollAnimalRequestDto, ReportTheftRequestDto } from '../dto/animal-request.dto';
import { AnimalHttpMapper } from '../../../application/mapper/animal-http.mapper';

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
    const animal = await this.enroll.execute({
      ownerId: dto.ownerId,
      species: dto.species,
      breed: dto.breed,
      ageEstimate: dto.ageEstimate,
      distinctiveSign: dto.distinctiveSign,
      signatureId: dto.signatureId,
      enrolledByAgentId: dto.enrolledByAgentId,
    });
    return AnimalHttpMapper.toResponse(animal);
  }

  @Post('verify')
  async verifyAnimal(@Body() body: { signatureId: string }) {
    const result = await this.verify.execute(body.signatureId);
    return {
      status: result.status,
      animal: result.animal ? AnimalHttpMapper.toResponse(result.animal) : null,
    };
  }

  @Post(':publicId/theft')
  async report(@Param('publicId') publicId: string, @Body() dto: ReportTheftRequestDto) {
    return this.reportTheft.execute({
      animalId: publicId,
      reportedByEleveur: dto.reportedByEleveur,
      reportedByAgent: dto.reportedByAgent,
      location: dto.location,
      circumstances: dto.circumstances,
    });
  }

  @Get()
  async findAll(@Query('ownerId') ownerId?: string) {
    const animals = await this.list.execute(ownerId);
    return animals.map(AnimalHttpMapper.toResponse);
  }
}
