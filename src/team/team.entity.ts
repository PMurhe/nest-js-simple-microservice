import { Company } from 'src/company/company.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  teamId: string;

  @Column()
  teamlead: string;

  @Column()
  teamsize: number;

  @Column()
  project: string;

  @ManyToOne(() => Company, (company) => company.team, { eager: true })
  company: Company;
}
