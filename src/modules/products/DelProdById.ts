import { Arg, Mutation, Resolver } from 'type-graphql';
import { Product } from '../../entity/Product';

@Resolver()
export class DeleteProdResolver {
  @Mutation(() => Product, { nullable: true })
  async delProdById(@Arg('id') id: string): Promise<null> {
    const found = await Product.findOne({ where: { id } });

    if (!found) throw new Error('Product not found!');

    await Product.delete(id);

    return null;
  }
}
