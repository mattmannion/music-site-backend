import { Arg, Query, Resolver } from 'type-graphql';
import { jsonbtest } from '../../entity/jsonbtest';

@Resolver()
export class FindJsonByIdResolver {
  @Query(() => jsonbtest)
  async findJsonById(@Arg('id') id: string): Promise<jsonbtest | null> {
    const found = await jsonbtest.findOne({ where: { id } });

    if (!found) throw new Error('Item not found!');

    return found;
  }
}
