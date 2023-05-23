import { Word } from 'src/models/word.entity';
import { GetRandomWordDto } from '../dto/GetRandomWord.dto';

export const WordFormatter = (
  wordInput: Word,
  quizSettings: GetRandomWordDto,
) => {
  if (quizSettings.randomLanguage === 'true') {
    const randomValue = getRandomValue('primaryLanguage', 'secondaryLanguage');
    const orderedWord = {
      id: wordInput.id,
      wordFrom:
        randomValue === 'secondaryLanguage'
          ? wordInput.secondaryLanguage
          : wordInput.primaryLanguage,
      wordTo:
        randomValue === 'secondaryLanguage'
          ? wordInput.primaryLanguage
          : wordInput.secondaryLanguage,
    };
    return orderedWord;
  }
  if (quizSettings.languageFrom === 'secondaryLanguage') {
    const orderedWord = {
      id: wordInput.id,
      wordFrom: wordInput.secondaryLanguage,
      wordTo: wordInput.primaryLanguage,
    };
    return orderedWord;
  }
  if (quizSettings.languageFrom === 'primaryLanguage') {
    const orderedWord = {
      id: wordInput.id,
      wordFrom: wordInput.primaryLanguage,
      wordTo: wordInput.secondaryLanguage,
    };
    return orderedWord;
  }
};

const getRandomValue = (value1: string, value2: string) => {
  const randomIndex = Math.floor(Math.random() * 2);
  return randomIndex === 0 ? value1 : value2;
};
