import { Injectable } from '@nestjs/common';
import { EncryptionUtil } from './utils/encryption.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptsService {
    constructor(private configService: ConfigService) {}

    private get rsaPrivateKey(): string {
        return this.configService.get<string>('encryption.rsaPrivateKey') || '';
    }

    private get rsaPublicKey(): string {
        return this.configService.get<string>('encryption.rsaPublicKey') || '';
    }

    private get aesKeyLength(): number {
        return this.configService.get<number>('encryption.aesKeyLength') || 32;
    }

    encryptData(payload: string): { data1: string, data2: string } {
        // 1. Generate random AES key
        const aesKey = EncryptionUtil.generateAESKey(this.aesKeyLength);

        // 2. Encrypt payload with AES key
        const data2 = EncryptionUtil.encryptWithAES(payload, aesKey);

        // 3. Encrypt AES key with RSA private key
        const data1 = EncryptionUtil.encryptWithRSA(aesKey, this.rsaPrivateKey);

        return {
            data1,
            data2,
        };
    }

    decryptData(data1: string, data2: string): string {
        // 1. Decrypt AES key with RSA public key
        const aesKey = EncryptionUtil.decryptWithRSA(data1, this.rsaPublicKey);

        // 2. Decrypt payload with AES key
        const decryptedData = EncryptionUtil.decryptWithAES(data2, aesKey);

        return decryptedData;
    }
}
