import { Dto } from "src/config/Dto";
import { IsString } from "class-validator";

export class DeleteProfileDto extends Dto<DeleteProfileDto> {
  @IsString()
  userId: string;
}
