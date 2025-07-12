import { Injectable, ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async accountUser(dtoSignUp: SignUpDto) {
    const email = dtoSignUp.email.trim().toLowerCase();
    const name = dtoSignUp.name.trim();
    const password = dtoSignUp.password;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con este correo');
    }

    try {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          refreshToken,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      return newUser;
    } catch (error) {
      console.error('[Registro] Error al crear usuario:', error);
      throw new InternalServerErrorException('Error interno al registrar el usuario');
    }
  }

  async validateUser(dtoSignIn: SignInDto) {
    const foundUserByEmail = await this.prisma.user.findUnique({
      where: {
        email: dtoSignIn.email.trim().toLowerCase(),
      },
    });

    if (!foundUserByEmail) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      dtoSignIn.password,
      foundUserByEmail.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Retorno solo datos seguros
    return {
      id: foundUserByEmail.id,
      name: foundUserByEmail.name,
      email: foundUserByEmail.email,
      createdAt: foundUserByEmail.createdAt,
    };
  }

  async fetchinAllUser() {
    const fetchinAllUser = await this.prisma.user.findMany();

    if (!fetchinAllUser) {
      return []
    }

    return fetchinAllUser;
  }

  async fetchingUserById(id: number) {
    const foundUserById = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!foundUserById) {
      throw new NotFoundException(`Usuario con el id ${id} no fue encontrado`);
    }

    return foundUserById;
  }

  async refreshTokens(dtoRefreshToken: RefreshTokenDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dtoRefreshToken.userId } });
    
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Acceso denegado');
    }
    
    const refreshTokenMatches = await bcrypt.compare(
      dtoRefreshToken.refreshToken,
      user.refreshToken
    );
    
    if (!refreshTokenMatches) throw new ForbiddenException('Acceso denegado');
    
    const payload = { sub: user.id, email: user.email, name: user.name };
    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRESIN
    });
    
    return {
      access_token: newAccessToken
    };
  }

  
}
