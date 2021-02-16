import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;
  @BeforeInsert()
  generateId() {
    this.id = uuid().replace(/-/g, '');
  }

  @Field()
  @Column()
  name: string;

  @Field(() => [[String]])
  @Column({ array: true })
  options: string;
}
