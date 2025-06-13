import { Module } from '@nestjs/common';
import { EncryptsController } from './encrypts.controller';
import { EncryptsService } from './encrypts.service';
import { EncryptionUtil } from './utils/encryption.util';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [EncryptsController],
  providers: [EncryptsService, ConfigService],
})
export class EncryptsModule {}
