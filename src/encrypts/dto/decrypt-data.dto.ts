import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptDataDto {
    @ApiProperty({
        description: 'Encrypted AES key',
        example: 'base64-encoded-encrypted-key'
    })
    @IsNotEmpty()
    @IsString()
    data1: string;

    @ApiProperty({
        description: 'Encrypted payload',
        example: 'iv:base64-encoded-encrypted-data'
    })
    @IsNotEmpty()
    @IsString()
    data2: string;
} 