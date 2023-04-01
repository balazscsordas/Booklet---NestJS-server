import { Injectable } from '@nestjs/common';
import { GetRandomWordDto } from 'src/words/dto/GetRandomWord.dto';
import { Word } from 'src/words/word.entity';

@Injectable()
export class WordHelperService {
  WordFormatter = (wordInput: Word, quizSettings: GetRandomWordDto) => {
    if (quizSettings.randomLanguage === 'true') {
      const randomValue = this.getRandomValue('hun', 'eng');
      const orderedWord = {
        id: wordInput.id,
        wordFrom: randomValue === 'eng' ? wordInput.eng : wordInput.hun,
        wordTo: randomValue === 'eng' ? wordInput.hun : wordInput.eng,
      };
      return orderedWord;
    }
    if (quizSettings.languageFrom === 'eng') {
      const orderedWord = {
        id: wordInput.id,
        wordFrom: wordInput.eng,
        wordTo: wordInput.hun,
      };
      return orderedWord;
    }
    if (quizSettings.languageFrom === 'hun') {
      const orderedWord = {
        id: wordInput.id,
        wordFrom: wordInput.hun,
        wordTo: wordInput.eng,
      };
      return orderedWord;
    }
  };

  private getRandomValue(value1: string, value2: string) {
    const randomIndex = Math.floor(Math.random() * 2);
    return randomIndex === 0 ? value1 : value2;
  }
}
