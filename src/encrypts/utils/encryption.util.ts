import * as crypto from 'crypto';

export class EncryptionUtil {
    static generateAESKey(aesKeyLength: number): string {
        return crypto.randomBytes(aesKeyLength).toString('hex');
    }

    static encryptWithAES(data: string, key: string): string {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
        let encrypted = cipher.update(data, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return `${iv.toString('hex')}:${encrypted}`;
    }

    static encryptWithRSA(data: string, rsaPrivateKey: string): string {
        console.log(rsaPrivateKey)
        const buffer = Buffer.from(data, 'utf8');
        const encrypted = crypto.privateEncrypt(
            {
                key: rsaPrivateKey,
                padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            buffer
        );
        return encrypted.toString('base64');
    }

    static decryptWithRSA(data: string, rsaPublicKey: string): string {
        const buffer = Buffer.from(data, 'base64');
        const decrypted = crypto.publicDecrypt(
            {
                key: rsaPublicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            buffer
        );
        return decrypted.toString('utf8');
    }

    static decryptWithAES(data: string, key: string): string {
        const [ivHex, encryptedData] = data.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
        let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
} 