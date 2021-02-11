import { Ctx, Query, Resolver } from 'type-graphql';

import { Users } from '../../entity/Users';
import { MyContext } from 'src/types/MyContext';

@Resolver()
export class MeResolver {
  @Query(() => Users, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<Users | undefined> {
    if (!ctx.req.session.userId) return undefined;

    return Users.findOne(ctx.req.session.userId);
  }
}
