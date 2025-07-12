import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Crear usuario' })
  createAccount(@Body() dtoSignUp: SignUpDto) {
    return this.authService.accountUser(dtoSignUp);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Iniciar sesión' })
  validateUser(@Body() dtoSignIn: SignInDto) {
    return this.authService.validateUser(dtoSignIn);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  fetchingAllUser() {
    return this.authService.fetchinAllUser();
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refrescar token de acceso' })
  async refreshToken(@Body() dtoRefreshToken: RefreshTokenDto) {
    return this.authService.refreshTokens(dtoRefreshToken);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontrar al usuario por su id' })
  fetchingUserById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.fetchingUserById(id);
  }
}
