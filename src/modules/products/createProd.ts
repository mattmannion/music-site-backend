import { Arg, Mutation, Resolver } from 'type-graphql';
import { Product } from '../../entity/Product';
import { CreateProductInput } from './ProdInputs/CreateProdInput';

@Resolver()
export class CreateProdResolver {
  @Mutation(() => Product)
  async createProd(
    @Arg('data') { name, options }: CreateProductInput
  ): Promise<Product> {
    return Product.create({
      name,
      options,
    }).save();
  }
}
