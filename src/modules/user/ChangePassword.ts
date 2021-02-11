import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { redis } from '../../redis';
import { Users } from '../../entity/Users';
import { ChangePasswordInput } from './changePassword/ChangePasswordInput';
import { forgotPasswordPrefix } from '../constants/redisPrefixes';
import { MyContext } from 'src/types/MyContext';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => Users, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<Users | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) return null;

    const user = await Users.findOne(userId);

    if (!user) return null;

    await redis.del(token);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    ctx.req.session.userId = user.id;

    return user;
  }
}
