import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcrypt';
import { Users } from '../../entity/Users';
import { RegisterInput } from './register/RegisterInput';
import { isAuth } from '../middleware/isAuth';
import { sendEmail } from '../utils/sendEmail';
import { createConfUrl } from '../utils/createConfUrl';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Mutation(() => Users)
  async register(
    @Arg('data') { email, firstName, lastName, password }: RegisterInput
  ): Promise<Users> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    await sendEmail(email, await createConfUrl(user.id)).then(() =>
      console.log('email sent')
    );

    return user;
  }
}
