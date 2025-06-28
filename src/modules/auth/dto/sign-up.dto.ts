import { Dto } from 'src/config/Dto';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto extends Dto<SignUpDto> {
  @ApiProperty({
    example: 'Jossssss',
    description: 'Nombre completo del usuario',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name: string;

  @ApiProperty({
    example: 'jossssss@senda.com',
    description: 'Correo electrónico válido y único',
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd!',
    description:
      'Contraseña segura: minúscula, mayúscula, número y símbolo. Entre 8 y 64 caracteres.',
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(64, { message: 'La contraseña es demasiado larga' })
  @Matches(/(?=.*[a-z])/, {
    message: 'La contraseña debe contener al menos una letra minúscula',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'La contraseña debe contener al menos una letra mayúscula',
  })
  @Matches(/(?=.*\d)/, {
    message: 'La contraseña debe contener al menos un número',
  })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: 'La contraseña debe contener al menos un símbolo (@$!%*?&)',
  })
  password: string;
}
