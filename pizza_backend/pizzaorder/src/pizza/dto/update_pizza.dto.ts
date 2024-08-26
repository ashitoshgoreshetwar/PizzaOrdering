import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class UpdatePizzaDto
{
    
    @IsNotEmpty()
    @IsString()
    Name : string;

    @IsNotEmpty()
    @IsString()
    Type : string;

    @IsNotEmpty()
    @IsString()
    ImageUrl : string;
}