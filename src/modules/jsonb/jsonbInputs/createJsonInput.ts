import { Field, InputType } from 'type-graphql';
import GraphQLJSON from 'graphql-type-json';
import { Option } from '../../../entity/jsonbtest';

@InputType()
export class Input {
  @Field({ nullable: true })
  name: string;

  @Field(() => [GraphQLJSON])
  options: [Option];
}
