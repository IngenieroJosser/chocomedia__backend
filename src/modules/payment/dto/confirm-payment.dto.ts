import { Dto } from "src/config/Dto";
import { IsString } from "class-validator";

export class ConfirmPaymentDto extends Dto<ConfirmPaymentDto> {
  @IsString()
  paymentId: string;

  @IsString()
  userId: string;

  @IsString()
  contentId: string;

  @IsString()
  type: string;

  @IsString()
  status: string;
}