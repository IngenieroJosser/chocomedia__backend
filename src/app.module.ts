import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ContentModule } from './modules/content/content.module';
import { AdminModule } from './modules/admin/admin.module';
import { MediaModule } from './modules/media/media.module';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [AuthModule, UsersModule, ContentModule, AdminModule, MediaModule, LoggerModule, PrismaModule, PaymentModule],
})
export class AppModule {}
