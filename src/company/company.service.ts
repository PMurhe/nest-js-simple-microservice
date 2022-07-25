import {
  ConflictException,
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

  /**
   * This function will get list of all companies
   * @returns Array of Company Objects
   */
  async getAllCompanies() {
    const companies = await this.companyRepository.find();
    return companies;
  }

  /**
   * This function will get the Specific Company based on the ID
   * @param id - UUID - refers to company ID
   * @returns Company Object
   */
  async getCompanyById(id) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company with ID "${id}" not found`);
    }
    return company;
  }

  /**
   * This function will search the company based on name
   * @param filterCompanyDto
   * @returns Array of Company Objects, can be empty array in case of no match
   */
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

  /**
   * This funciton will create a new company.
   * @param createCompanyDto
   * @returns Newly Created Company Object
   */
  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { name, address, ceo } = createCompanyDto;
    const alreadyExists = await this.companyRepository.find({
      where: { name },
    });
    if (alreadyExists.length == 0) {
      const company = this.companyRepository.create({
        name,
        address,
        ceo,
      });
      return await this.companyRepository.save(company);
    } else {
      throw new ConflictException(`Company with name ${name} already exists`);
    }
  }
}
