import { Arg, Mutation, Resolver } from 'type-graphql';
import { jsonbtest } from '../../entity/jsonbtest';
import { Input } from './jsonbInputs/createJsonInput';
import { v4 as uuid } from 'uuid';

@Resolver()
export class CreateJsonResolver {
  @Mutation(() => jsonbtest)
  async createJson(
    @Arg('data') { name, options }: Input
  ): Promise<jsonbtest | void> {
    const id = uuid().replace(/-/g, '');

    const colors = options.map(({ color }) => color);
    const imgs = options.map(({ img }) => JSON.stringify(img));

    const jsonString = () => {
      let res = [];
      for (let i = 0; i < options.length; i++) {
        res.push(`json('{"color": "${colors[i]}", "img": ${imgs[i]}}')`);
      }
      return res;
    };

    // acutally db entry
    await jsonbtest.query(`
      insert into jsonbtest(id, name, options)
      values('${id}', '${name}', array[${jsonString().join(',')}])
    `);

    // return only for graphql response
    return jsonbtest.create({ id, name, options });
  }
}
