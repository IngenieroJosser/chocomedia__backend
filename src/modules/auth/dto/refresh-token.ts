import { Dto } from "src/config/Dto";
import { IsString, IsNumber } from "class-validator";

export class RefreshTokenDto extends Dto<RefreshTokenDto> {
  @IsNumber()
  userId: number;

  @IsString()
  refreshToken: string;
}