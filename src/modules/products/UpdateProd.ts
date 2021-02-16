import { Arg, Mutation, Resolver } from 'type-graphql';
import { Product } from '../../entity/Product';
import { UpdateProdInput } from './ProdInputs/UpdateProdInput';

@Resolver()
export class UpdateProdResolver {
  @Mutation(() => Product, { nullable: true })
  async updateProdById(
    @Arg('data') { id, name, options }: UpdateProdInput
  ): Promise<Product | undefined> {
    const found = await Product.findOne({ where: { id } });

    if (!found) throw new Error('Product not found!');

    await Product.update({ id }, { name, options });

    return await Product.findOne({ where: { id } });
  }
}
