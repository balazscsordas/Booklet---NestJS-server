import { Profile } from 'src/models/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WordList } from './word-list.entity';

@Entity({ name: 'words' })
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  primaryLanguage: string;

  @Column()
  secondaryLanguage: string;

  @Column()
  profile_id: number;

  @ManyToOne(() => Profile, profile => profile.words)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @Column()
  word_list_id: number;

  @ManyToOne(() => WordList, wordList => wordList.words)
  @JoinColumn({ name: 'word_list_id' })
  word_list: WordList;
}
