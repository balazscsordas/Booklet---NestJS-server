import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AudioService {
  async getAudioUrl(text: string) {
    try {
      const options = {
        method: 'POST',
        url: process.env.AUDIO_API_URL,
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.AUDIO_API_KEY,
          'X-RapidAPI-Host': process.env.AUDIO_API_HOST,
        },
        data: text,
      };

      const response = await axios(options);
      const audioUrlId = response.data.id;

      const options2 = {
        method: 'GET',
        url: process.env.AUDIO_API_URL,
        params: { id: audioUrlId },
        headers: {
          'X-RapidAPI-Key': process.env.AUDIO_API_KEY,
          'X-RapidAPI-Host': process.env.AUDIO_API_HOST,
        },
      };
      await this.sleep(5000);
      const response2 = await axios(options2);
      return { src: response2.data.url };
    } catch (err) {
      console.log(err);
    }
  }
  //
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
