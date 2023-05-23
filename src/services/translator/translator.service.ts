import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { TextTranslateDto } from 'src/routes/word/dto/TextTranslate.dto';

@Injectable()
export class TranslatorService {
  async translateText(translateParams: TextTranslateDto) {
    const encodedParams = new URLSearchParams();
    encodedParams.append('text', translateParams.textToTranslate);
    encodedParams.append('from', translateParams.translateFrom);
    encodedParams.append('to', translateParams.translateTo);

    const options = {
      method: 'POST',
      url: process.env.TRANSLATOR_API_URL,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.TRANSLATOR_API_KEY,
        'X-RapidAPI-Host': process.env.TRANSLATOR_API_HOST,
      },
      data: encodedParams,
    };

    try {
      const response = await axios(options);
      const translatedText = response.data.response;
      return translatedText;
    } catch (err) {
      throw new HttpException(
        'Daily quota has been exceeded.',
        HttpStatus.NO_CONTENT,
      );
    }
  }
}
