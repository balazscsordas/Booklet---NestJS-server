import { Profile } from 'src/models/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
