import { IsNotEmpty } from 'class-validator';

export class GetCompanyByIdDto {
  @IsNotEmpty()
  id: string;
}
