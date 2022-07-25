import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/team/team.entity';
import { Company } from '../company/company.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Company]), AuthModule],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
