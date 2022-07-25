import { IsNotEmpty, IsString } from 'class-validator';


export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  ceo: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
