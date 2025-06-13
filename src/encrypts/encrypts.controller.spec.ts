import { Test, TestingModule } from '@nestjs/testing';
import { EncryptsController } from './encrypts.controller';
import { EncryptsService } from './encrypts.service';
import { EncryptDataDto } from './dto/encrypt-data.dto';
import { DecryptDataDto } from './dto/decrypt-data.dto';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

describe('EncryptsController', () => {
  let controller: EncryptsController;
  let service: EncryptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      controllers: [EncryptsController],
      providers: [EncryptsService],
    }).compile();

    controller = module.get<EncryptsController>(EncryptsController);
    service = module.get<EncryptsService>(EncryptsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getEncryptData', () => {
    it('should return encrypted data from service', () => {
      // Arrange
      const payload = 'test data';
      const encryptDataDto: EncryptDataDto = { payload };
      const expectedResult = {
        data1: 'encrypted-key',
        data2: 'encrypted-payload',
      };

      jest.spyOn(service, 'encryptData').mockReturnValue(expectedResult);

      // Act
      const result = controller.getEncryptData(encryptDataDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.encryptData).toHaveBeenCalledWith(payload);
    });

    it('should handle empty string payload', () => {
      // Arrange
      const payload = '';
      const encryptDataDto: EncryptDataDto = { payload };
      const expectedResult = {
        data1: 'encrypted-key',
        data2: 'encrypted-payload',
      };

      jest.spyOn(service, 'encryptData').mockReturnValue(expectedResult);

      // Act
      const result = controller.getEncryptData(encryptDataDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.encryptData).toHaveBeenCalledWith(payload);
    });
  });

  describe('getDecryptData', () => {
    it('should return decrypted data from service', () => {
      // Arrange
      const data1 = 'encrypted-key';
      const data2 = 'encrypted-payload';
      const decryptDataDto: DecryptDataDto = { data1, data2 };
      const expectedResult = 'decrypted-data';

      jest.spyOn(service, 'decryptData').mockReturnValue(expectedResult);

      // Act
      const result = controller.getDecryptData(decryptDataDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(service.decryptData).toHaveBeenCalledWith(data1, data2);
    });
  });
});
