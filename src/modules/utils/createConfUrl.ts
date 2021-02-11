import { v4 as uuid } from 'uuid';
import { redis } from '../../redis';

export const createConfUrl = async (userId: number) => {
  const token = uuid();
  await redis.set(token, userId, 'ex', 60 * 60 * 24); // 1 day expiration

  return `http://localhost:1234/user/confirm/${token}`;
};
