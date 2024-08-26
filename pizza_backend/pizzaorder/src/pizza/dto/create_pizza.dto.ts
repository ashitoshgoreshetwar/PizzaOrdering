import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';
export class CreatePizzaDto
{
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString()
    @Length(3, 10, { message: 'Name length should be less than 10' })
    Name : string;

    @IsNotEmpty()
    @IsString()
    @Length(3,10,{ message : "Type length must be less than 10"})

    Type : string;

    @IsNotEmpty({message:"Image Url Not Empty"})
    @IsString()
    ImageUrl : string;
}
