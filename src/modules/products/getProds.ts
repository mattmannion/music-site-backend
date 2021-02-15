import { Query, Resolver } from 'type-graphql';

import { Product } from '../../entity/Product';

@Resolver()
export class getProdsResolver {
  @Query(() => [Product])
  async getTests(): Promise<Products[] | null> {
    if (!Product) return null;
    return await Product.find();
  }
}
