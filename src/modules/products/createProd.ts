import { Arg, Mutation, Resolver } from 'type-graphql';
import { Product } from '../../entity/Product';
import { CreateProductInput } from './createProd/CreateProdInput';

@Resolver()
export class createProdResolver {
  @Mutation(() => Product)
  async createTest(
    @Arg('data') { name, options }: CreateProductInput
  ): Promise<Product> {
    return Product.create({
      name,
      options,
    }).save();
  }
}
