import { Profile } from 'src/profile/profile.entity';
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
  hun: string;

  @Column()
  eng: string;

  @Column()
  profile_id: number;

  @ManyToOne(() => Profile, profile => profile.words)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
