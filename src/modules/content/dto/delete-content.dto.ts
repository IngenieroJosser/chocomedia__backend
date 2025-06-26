import { Dto } from "src/config/Dto";
import { IsString } from "class-validator";

export class DeleteContentDto extends Dto<DeleteContentDto> {
  @IsString()
  contentId: string;
}