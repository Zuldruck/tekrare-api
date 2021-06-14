import {
  nonNull,
  queryType,
  stringArg,
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

    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      args: {
        searchString: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      resolve: (_parent, args, context: Context) => {
        const or = args.searchString
          ? {
              OR: [
                { title: { contains: args.searchString } },
                { content: { contains: args.searchString } },
              ],
            }
          : {};

        return context.prisma.post.findMany({
          where: {
            published: true,
            ...or,
          },
          take: args.take || undefined,
          skip: args.skip || undefined,
        });
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

    t.nonNull.field('post', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_, { id }, ctx: Context) {
        return ctx.prisma.post.findUnique({
          where: { id },
        });
      }
    });
  },
});
