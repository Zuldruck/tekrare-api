import { objectType } from 'nexus';

const Connection = objectType({
  name: 'Connection',
  definition(t) {
    t.nonNull.string('token');
  },
});

export const types = [
  Connection,
];
