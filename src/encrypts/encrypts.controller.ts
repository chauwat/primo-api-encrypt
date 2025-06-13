import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { EncryptsService } from './encrypts.service';
import { EncryptDataDto } from './dto/encrypt-data.dto';
import { DecryptDataDto } from './dto/decrypt-data.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Encryption')
@Controller('')
export class EncryptsController {
    constructor(private readonly encryptsService: EncryptsService) {}

    @Post('get-encrypt-data')
    @ApiOperation({ summary: 'Encrypt data using AES and RSA' })
    @ApiResponse({ 
        status: 200, 
        description: 'Data encrypted successfully',
        schema: {
            type: 'object',
            properties: {
                data1: { type: 'string', description: 'Encrypted AES key' },
                data2: { type: 'string', description: 'Encrypted payload' }
            }
        }
    })
    getEncryptData(
        @Body(new ValidationPipe()) encryptDataDto: EncryptDataDto
    ) {
        const encryptedData = this.encryptsService.encryptData(encryptDataDto.payload);
        return encryptedData;
    }

    @Post('get-decrypt-data')
    @ApiOperation({ summary: 'Decrypt data using AES and RSA' })
    @ApiResponse({ 
        status: 200, 
        description: 'Data decrypted successfully',
        schema: {
            type: 'object',
            properties: {
                decryptedData: { type: 'string', description: 'Decrypted payload' }
            }
        }
    })
    getDecryptData(
        @Body(new ValidationPipe()) decryptDataDto: DecryptDataDto
    ) {
        const decryptedData = this.encryptsService.decryptData(decryptDataDto.data1, decryptDataDto.data2);
        return decryptedData;
    }
}
