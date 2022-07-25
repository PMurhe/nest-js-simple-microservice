import { IsNotEmpty, IsString } from 'class-validator';

export class FilterCompanyDto {
  @IsNotEmpty()
  name: string
}
