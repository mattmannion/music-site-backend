import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateProdInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [[String]])
  options: string;
}
