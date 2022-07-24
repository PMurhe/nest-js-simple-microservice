import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateTeamDto{
   
    @IsNotEmpty()
    @IsString()
    teamlead : string;

    @IsNotEmpty()
    @IsNumber()
    teamsize : number;

    @IsNotEmpty()
    @IsString()
    project : string
}