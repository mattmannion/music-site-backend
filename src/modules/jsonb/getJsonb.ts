import { Query, Resolver } from 'type-graphql';
import { jsonbtest } from '../../entity/jsonbtest';

@Resolver()
export class GetJSONResolver {
  @Query(() => [jsonbtest])
  async getJson() {
    const found = await jsonbtest.find();
    if (found.length === 0) throw new Error('No items');
    return found;
  }
}
