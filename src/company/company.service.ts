import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company-dto';
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterCompanyDto } from './dto/filter-company-dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async getAllCompanies() {
    const companies = await this.companyRepository.find();
    return companies;
  }

  async getCompanyById(id) {
    try {
      const company = await this.companyRepository.findOne({ where: { id } });
      if (!company) {
        throw new NotFoundException(`Company with ID "${id}" not found`);
      }
      return company;
    } catch (companyByIdError) {
      throw new InternalServerErrorException(companyByIdError);
    }
  }

  async getCompanyByName(
    filterCompanyDto: FilterCompanyDto,
  ): Promise<Company[]> {
    try {
      const { name } = filterCompanyDto;
      const query = this.companyRepository.createQueryBuilder('company');

      if (name) {
        query.where('LOWER(company.name) LIKE LOWER(:name)', {
          name: `%${name}%`,
        });
      }

      const companies = await query.getMany();
      return companies;
    } catch (getCompanyByNameError) {
      throw new InternalServerErrorException(getCompanyByNameError);
    }
  }

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const { name, address, ceo } = createCompanyDto;
      const company = this.companyRepository.create({
        name,
        address,
        ceo,
      });
      return await this.companyRepository.save(company);
    } catch (createCompanyErrror) {
      throw new InternalServerErrorException(createCompanyErrror);
    }
  }
}
