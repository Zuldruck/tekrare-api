import { objectType } from 'nexus';
import { Context } from '../context';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.string('content');
    t.nonNull.boolean('published');
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    });
  },
});
