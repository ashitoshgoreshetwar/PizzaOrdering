import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class CreateCustomerDto 
{
  @IsNotEmpty({message : "FirstName Should Not Empty"})
  @IsString()
  @Length(3, 10, { message: 'FirstName length should be less than 10' })
  FirstName: string;

  @IsNotEmpty({message : "LastName Should Not Empty"})
  @IsString()
  @Length(3, 10, { message: 'LastName length should be less than 10' })
  LastName: string;

  @IsNotEmpty({message : "Address Should Not Empty"})
  @IsString()
  Address: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10, { message: 'PhoneNumber length should be 10' })
  PhoneNumber: string; 

  @IsNotEmpty()
  @IsEmail()
  EmailAddress: string;
}