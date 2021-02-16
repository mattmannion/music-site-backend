import { Arg, Query, Resolver } from 'type-graphql';
import { Product } from '../../entity/Product';

@Resolver()
export class FindProdsByNameResolver {
  @Query(() => [Product], { nullable: true })
  async findProdsByName(@Arg('name') name: string): Promise<Product[] | null> {
    const found = await Product.find({ where: { name } });
    if (!found) throw new Error('No products with that name');
    return found;
  }
}
