import { inputObjectType } from 'nexus';

const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title');
    t.string('content');
  },
});

export const types = [
  PostCreateInput,
];
