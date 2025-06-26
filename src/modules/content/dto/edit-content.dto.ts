import { Dto } from "src/config/Dto";
import { IsString } from "class-validator";

export class EditContentDto extends Dto<EditContentDto> {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsString()
  url: string;

  @IsString()
  thumbnail: string;

  @IsString()
  duration: string;

  @IsString()
  wordCount: string;

  @IsString()
  premium: string;

  @IsString()
  price: string;

  @IsString()
  authorId: string;

  @IsString()
  category: string;

  @IsString()
  tags: string[];
}