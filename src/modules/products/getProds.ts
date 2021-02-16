import { Query, Resolver } from 'type-graphql';
import { Product } from '../../entity/Product';

@Resolver()
export class GetProdsResolver {
  @Query(() => [Product])
  async getProds(): Promise<Product[] | null> {
    if (!Product) return null;
    return await Product.find();
  }
}
