import {
  nonNull,
  queryType,
  intArg,
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
        id: nonNull(intArg()),
      },
      resolve(_, { id }, ctx: Context) {
        return ctx.prisma.user.findUnique({
          where: { id },
        });
      }
    });
  },
});
