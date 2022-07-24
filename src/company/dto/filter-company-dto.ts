import { IsString } from 'class-validator';

export class FilterCompanyDto {
  @IsString()
  name: string
}
