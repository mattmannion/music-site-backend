import { Arg, Query, Resolver } from 'type-graphql';
import { Product } from '../../entity/Product';
// import { UpdateProdInput } from './ProdInputs/UpdateProdInput';

@Resolver()
export class FindProdByIdResolver {
  @Query(() => Product, { nullable: true })
  async findProdById(@Arg('id') id: string): Promise<Product | undefined> {
    const found = await Product.findOne({ where: { id } });

    if (!found) throw new Error('Product not found!');

    return await Product.findOne({ where: { id } });
  }
}
