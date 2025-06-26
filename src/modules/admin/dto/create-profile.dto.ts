import { Dto } from "src/config/Dto";
import { IsString } from "class-validator";

export class CreateProfileDto extends Dto<CreateProfileDto> {
  @IsString()
  bio: string;

  @IsString()
  avatar: string;

  @IsString()
  website: string;

  @IsString()
  socialLinks: string;
}