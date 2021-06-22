import {
  queryType,
  intArg,
  stringArg,
} from 'nexus';
import { Context } from '../../context';

export const query = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany();
      },
    });

    t.nonNull.field('user', {
      type: 'User',
      args: {
        id: intArg(),
        walletAddress: stringArg(),
      },
      resolve(_, { id, walletAddress }: any, ctx: Context) {
        if (!id && !walletAddress)
          throw new Error('Either id or address is needed.');
        const where = id ? { id } : { walletAddress };
        return ctx.prisma.user.findUnique({ where });
      }
    });
  },
});
