import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EncryptDataDto {
    @ApiProperty({
        description: 'Data to be encrypted',
        example: 'Hello, this is a secret message',
        minLength: 0,
        maxLength: 2000
    })
    @IsNotEmpty()
    @IsString()
    @Length(0, 2000)
    payload: string;
} 