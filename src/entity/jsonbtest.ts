// import { json } from 'express';
import GraphQLJSONObject from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

export interface Option {
  color: string;
  img: [string];
}

@ObjectType()
@Entity()
export class jsonbtest extends BaseEntity {
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

  @Field(() => [GraphQLJSONObject])
  @Column('json', { array: true })
  options: [Option];
}
