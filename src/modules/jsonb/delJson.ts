import { Arg, Mutation, Resolver } from 'type-graphql';
import { jsonbtest } from '../../entity/jsonbtest';

@Resolver()
export class DeleteJsonResolver {
  @Mutation(() => String)
  async delJsonById(@Arg('id') id: string): Promise<string | null> {
    const found = await jsonbtest.findOne({ where: { id } });

    if (!found) throw new Error('Product not found!');

    await jsonbtest.delete(id);

    return 'Delete Successful';
  }
}
