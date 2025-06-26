import { Dto } from "src/config/Dto";
import { IsEmail, IsString } from "class-validator";

export class SignInDto extends Dto<SignInDto> {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
