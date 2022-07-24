import { Injectable, NotFoundException } from '@nestjs/common';
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
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) {
      throw new NotFoundException(`Company with ID "${id}" not found`);
    }

    return company;
  }

  async getCompanyByName(
    filterCompanyDto: FilterCompanyDto,
  ): Promise<Company[]> {
    // return 'Fetched Company by name : Techwondoe';
    const { name } = filterCompanyDto;
    console.log(name);
    const query = this.companyRepository.createQueryBuilder('company');

    if (name) {
      query.where('LOWER(company.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }
    try {
      const companies = await query.getMany();
      return companies;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    console.log(createCompanyDto);
    const { name, address, ceo } = createCompanyDto;
    const company = this.companyRepository.create({
      name,
      address,
      ceo,
    });
    return await this.companyRepository.save(company);
  }
}
