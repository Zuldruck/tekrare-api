import { subscriptionType } from 'nexus';

export const subscription = subscriptionType({
  definition(t) {
    t.field('newPost', {
      type: 'Post',
      subscribe(_root, _args, ctx) {
        return ctx.pubsub.asyncIterator('newPost');
      },
      resolve(payload: any) {
        return payload;
      },
    });

    t.field('postPublished', {
      type: 'Post',
      subscribe(_root, _args, ctx) {
        return ctx.pubsub.asyncIterator('postPublished');
      },
      resolve(payload: any) {
        return payload;
      },
    });
  },
});

