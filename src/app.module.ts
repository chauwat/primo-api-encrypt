import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { EncryptsModule } from './encrypts/encrypts.module';

@Module({
  imports: [
    AppConfigModule,
    EncryptsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
