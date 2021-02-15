import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => [[String]])
  options: string;
}
