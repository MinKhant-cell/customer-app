import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone: string;
}