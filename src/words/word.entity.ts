import { User } from 'src/auth/auth.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'words' })
export class Word {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  hun: string

  @Column()
  eng: string

  @Column()
  user_id: number

  @ManyToOne(() => User, user => user.words)
  @JoinColumn({ name: 'user_id' })
  user: User
}
