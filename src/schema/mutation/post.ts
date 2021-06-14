import { arg, intArg, mutationField, nonNull, objectType, stringArg } from 'nexus';
import { Context } from '../../context';

export const createPost = mutationField('createPost', {
  type: 'Post',
  args: {
    data: nonNull(arg({ type: 'PostCreateInput' })),
    authorEmail: stringArg(),
  },
  resolve: async (_, args, context: Context) => {
    const newPost = await context.prisma.post.create({
      data: {
        title: args.data.title,
        content: args.data.content,
        author: {
          connect: { email: args.authorEmail },
        },
      },
    });

    context.pubsub.publish('newPost', newPost);
    return newPost;
  },
});

export const publishPost = mutationField('publishPost', {
  type: 'Post',
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, args, context: Context) => {
    const post = await context.prisma.post.findUnique({
      where: { id: args.id || undefined },
    });

    if (!post)
      throw new Error(`Post with ID ${args.id} does not exist in the database.`);

    if (!post.published)
      context.pubsub.publish('postPublished', post);

    return context.prisma.post.update({
      where: { id: args.id || undefined },
      data: { published: !post?.published },
    });
  },
})
