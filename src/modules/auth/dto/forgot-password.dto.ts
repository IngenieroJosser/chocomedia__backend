import { Dto } from "src/config/Dto";
import { IsEmail } from "class-validator";

export class ForgotPasswordDto extends Dto<ForgotPasswordDto> {
  @IsEmail()
  email: string;
}
