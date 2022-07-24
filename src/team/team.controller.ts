import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTeamDto } from './dto/create-team-dto';
import { TeamService } from './team.service';
import { Team } from './team.entity';

@Controller('team')
@UseGuards(AuthGuard())
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  async getAllTeams(): Promise<Team[]> {
    return this.teamService.getAllTeams();
  }

  @Post('/:id')
  async createTeam(
    @Body() createTeamDto: CreateTeamDto,
    @Param('id') companyId: string,
  ): Promise<{ message: string }> {
    return this.teamService.createTeam(createTeamDto, companyId);
  }
}
