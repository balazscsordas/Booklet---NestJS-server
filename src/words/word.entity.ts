import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'words' })
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hun: string;

  @Column()
  eng: string;
}
