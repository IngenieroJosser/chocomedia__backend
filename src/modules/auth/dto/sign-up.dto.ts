import { Dto } from "src/config/Dto";
import { IsEmail, IsString } from "class-validator";

export class SignUpDto extends Dto<SignUpDto> {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
