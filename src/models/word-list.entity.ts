import { Profile } from 'src/models/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Word } from './word.entity';

@Entity({ name: 'word-lists' })
export class WordList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  profile_id: number;

  @OneToMany(() => Word, word => word.word_list_id)
  words: Word[];

  @ManyToOne(() => Profile, profile => profile.words)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
