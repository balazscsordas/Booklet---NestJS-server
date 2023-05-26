import { Test, TestingModule } from '@nestjs/testing';
import { WordListService } from './word-list.service';

describe('WordListService', () => {
  let service: WordListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordListService],
    }).compile();

    service = module.get<WordListService>(WordListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
