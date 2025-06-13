import { Test, TestingModule } from '@nestjs/testing';
import { EncryptsService } from './encrypts.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { EncryptionUtil } from './utils/encryption.util';

jest.mock('./utils/encryption.util');

describe('EncryptsService', () => {
  let service: EncryptsService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration]
        })
      ],
      providers: [EncryptsService],
    }).compile();

    service = module.get<EncryptsService>(EncryptsService);
    configService = module.get<ConfigService>(ConfigService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encryptData', () => {
    it('should encrypt data successfully', () => {
      // Arrange
      const payload = 'test data';
      const aesKeyLength = configService.get<number>('encryption.aesKeyLength');
      const rsaPrivateKey = configService.get<string>('encryption.rsaPrivateKey');
      const mockAesKey = 'mock-aes-key';
      const mockEncryptedPayload = 'mock-encrypted-payload';
      const mockEncryptedKey = 'mock-encrypted-key';

      // Mock the encryption utility methods
      (EncryptionUtil.generateAESKey as jest.Mock).mockReturnValue(mockAesKey);
      (EncryptionUtil.encryptWithAES as jest.Mock).mockReturnValue(mockEncryptedPayload);
      (EncryptionUtil.encryptWithRSA as jest.Mock).mockReturnValue(mockEncryptedKey);

      const expectedResult = {
        data1: mockEncryptedKey,
        data2: mockEncryptedPayload,
      };

      // Act
      const result = service.encryptData(payload);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(EncryptionUtil.generateAESKey).toHaveBeenCalledWith(aesKeyLength);
      expect(EncryptionUtil.encryptWithAES).toHaveBeenCalledWith(payload, mockAesKey);
      expect(EncryptionUtil.encryptWithRSA).toHaveBeenCalledWith(mockAesKey, rsaPrivateKey);
    });

    it('should handle empty string payload', () => {
      // Arrange
      const payload = '';
      const aesKeyLength = configService.get<number>('encryption.aesKeyLength');
      const rsaPrivateKey = configService.get<string>('encryption.rsaPrivateKey');
      const mockAesKey = 'mock-aes-key';
      const mockEncryptedPayload = 'mock-encrypted-payload';
      const mockEncryptedKey = 'mock-encrypted-key';

      // Mock the encryption utility methods
      (EncryptionUtil.generateAESKey as jest.Mock).mockReturnValue(mockAesKey);
      (EncryptionUtil.encryptWithAES as jest.Mock).mockReturnValue(mockEncryptedPayload);
      (EncryptionUtil.encryptWithRSA as jest.Mock).mockReturnValue(mockEncryptedKey);

      const expectedResult = {
        data1: mockEncryptedKey,
        data2: mockEncryptedPayload,
      };

      // Act
      const result = service.encryptData(payload);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(EncryptionUtil.generateAESKey).toHaveBeenCalledWith(aesKeyLength);
      expect(EncryptionUtil.encryptWithAES).toHaveBeenCalledWith(payload, mockAesKey);
      expect(EncryptionUtil.encryptWithRSA).toHaveBeenCalledWith(mockAesKey, rsaPrivateKey);
    });
  });

  describe('decryptData', () => {
    it('should decrypted data successfully', () => {
      // Arrange
      const data1 = 'encrypted-key';
      const data2 = 'encrypted-payload';
      const rsaPublicKey = configService.get<string>('encryption.rsaPublicKey');
      const mockDecryptedData = 'decrypted-data';
      const mockAesKey = 'mock-aes-key';

      (EncryptionUtil.decryptWithRSA as jest.Mock).mockReturnValue(mockAesKey);
      (EncryptionUtil.decryptWithAES as jest.Mock).mockReturnValue(mockDecryptedData);

      // Act
      const result = service.decryptData(data1, data2);

      // Assert
      expect(result).toEqual(mockDecryptedData);
      expect(EncryptionUtil.decryptWithRSA).toHaveBeenCalledWith(data1, rsaPublicKey);
      expect(EncryptionUtil.decryptWithAES).toHaveBeenCalledWith(data2, mockAesKey);
    });
  });
});
