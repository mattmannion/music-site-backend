import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';

import { Users } from '../../entity/Users';
import { MyContext } from 'src/types/MyContext';

@Resolver()
export class LoginResolver {
  @Mutation(() => Users, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<Users | null> {
    const user = await Users.findOne({ where: { email } });

    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return null;

    ctx.req.session.userId = user.id;

    return user;
  }
}
