import { v4 as uuid } from 'uuid';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { sendEmail } from '../utils/sendEmail';
import { redis } from '../../redis';
import { Users } from '../../entity/Users';
import { forgotPasswordPrefix } from '../constants/redisPrefixes';

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await Users.findOne({ where: { email } });

    if (!user) return true;

    const token = uuid();

    await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24);

    await sendEmail(
      email,
      `http://localhost:1234/user/change-password/${token}`
    );

    return true;
  }
}
