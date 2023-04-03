import { Test, TestingModule } from '@nestjs/testing';
import { WordHelperService } from './word-helper.service';

describe('WordHelperService', () => {
  let service: WordHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordHelperService],
    }).compile();

    service = module.get<WordHelperService>(WordHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
