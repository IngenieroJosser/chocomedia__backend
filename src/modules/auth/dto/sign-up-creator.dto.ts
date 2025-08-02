import { Dto } from "src/config/Dto";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { PlanType, Role } from "@prisma/client";

export class SignUpCreatorDto extends Dto<SignUpCreatorDto> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsNotEmpty()
  plan: PlanType;
}