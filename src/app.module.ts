import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './models/word.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from './models/auth.entity';
import { Profile } from './models/profile.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth/auth.guard';
import { MailService } from './services/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Token } from './models/token.entity';
import { WordModule } from './routes/word/word.module';
import { ProfileModule } from './routes/profile/profile.module';
import { EmailModule } from './routes/email/email.module';
import { UserModule } from './routes/user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PW,
      database: process.env.DB,
      entities: [Word, User, Profile, Token],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1w' },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PW,
        },
      },
    }),
    WordModule,
    UserModule,
    ProfileModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    MailService,
  ],
})
export class AppModule {}
