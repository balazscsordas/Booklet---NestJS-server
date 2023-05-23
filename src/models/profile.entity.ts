import { User } from 'src/models/auth.entity';
import { Word } from 'src/models/word.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  primaryLanguage: string;

  @Column()
  secondaryLanguage: string;

  @Column()
  user_id: number;

  @OneToMany(() => Word, word => word.profile_id)
  words: Word[];

  @ManyToOne(() => User, user => user.profiles)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
