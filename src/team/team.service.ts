import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Team } from './team.entity';
import { Company } from '../company/company.entity';
import { CreateTeamDto } from './dto/create-team-dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async createTeam(
    createTeamDto: CreateTeamDto,
    companyId: string,
  ): Promise<{ message: string }> {
    // Check if the company exists
    const companyInfo = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (companyInfo) {
      const { project, teamlead, teamsize } = createTeamDto;
      const team = await this.teamRepository.create({
        project,
        teamlead,
        teamsize,
        company: companyInfo,
      });
      await this.teamRepository.save(team);
      return { message: `Team Created Successfully` };
    } else {
      throw new NotFoundException(
        `Company with ID ${companyId} does not exist. Team cannot be created.`,
      );
    }
  }

  async getAllTeams(): Promise<Team[]> {
    const teams = await this.teamRepository.find();
    return teams;
  }
}
