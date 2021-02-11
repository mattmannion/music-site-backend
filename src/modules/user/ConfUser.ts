import { Arg, Mutation, Resolver } from 'type-graphql';
import { Users } from '../../entity/Users';
import { redis } from '../../redis';

@Resolver()
export class ConfUserResolver {
  @Mutation(() => Boolean)
  async confUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(token);

    if (!userId) return false;

    await Users.update({ id: parseInt(userId, 10) }, { confirmed: true });

    await redis.del(token);

    return true;
  }
}