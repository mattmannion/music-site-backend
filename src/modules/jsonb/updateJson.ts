import { Arg, Mutation, Resolver } from 'type-graphql';
import { jsonbtest } from '../../entity/jsonbtest';
import { Input } from './jsonbInputs/createJsonInput';

@Resolver()
export class UpdateJsonResolver {
  @Mutation(() => jsonbtest)
  async updateJsonById(
    @Arg('id') id: string,
    @Arg('data') { name, options }: Input
  ): Promise<jsonbtest | void> {
    const found = await jsonbtest.findOne(id);
    if (!found) throw new Error('No item found');

    const colors = options.map(({ color }) => color);
    const imgs = options.map(({ img }) => JSON.stringify(img));

    const jsonString = () => {
      let res = [];
      for (let i = 0; i < options.length; i++) {
        res.push(`json('{"color": "${colors[i]}", "img": ${imgs[i]}}')`);
      }
      return res;
    };

    // deleting old entry to be replaced
    await jsonbtest.delete(id);

    // acutally db entry
    await jsonbtest.query(`
      insert into jsonbtest(id, name, options)
      values('${id}', '${name}', array[${jsonString().join(',')}])
    `);

    // return only for graphql response
    return jsonbtest.create({ id, name, options });
  }
}
