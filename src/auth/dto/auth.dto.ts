import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    hash: string;
}