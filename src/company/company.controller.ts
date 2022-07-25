import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company-dto';
import { Company } from './company.entity';
import { FilterCompanyDto } from './dto/filter-company-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCompanyByIdDto } from './dto/get-company-by-id.dto';

@Controller('company')
@UseGuards(AuthGuard())
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  getCompanyByName(
    @Query() filterCompanyDto: FilterCompanyDto,
  ): Promise<Company[]> {
    return this.companyService.getCompanyByName(filterCompanyDto);
  }

  @Get('/:id')
  getCompanyById(
    @Param('id') getCompanyByIdDto: GetCompanyByIdDto,
  ): Promise<Company> {
    const { id } = getCompanyByIdDto;
    return this.companyService.getCompanyById(id);
  }

  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyService.createCompany(createCompanyDto);
  }
}
