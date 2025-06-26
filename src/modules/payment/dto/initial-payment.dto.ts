import { Dto } from "src/config/Dto";
import { IsString } from "class-validator";

export class InitialPaymentDto extends Dto<InitialPaymentDto> {
  @IsString()
  amount: string;

  @IsString()
  currency: string;

  @IsString()
  userId: string;

  @IsString()
  contentId: string;

  @IsString()
  type: string;

  @IsString()
  status: string;

  @IsString()
  stripePaymentId: string;
}