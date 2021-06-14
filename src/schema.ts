import { makeSchema } from 'nexus';
import { definitions } from './definitions';
import { mutation } from './schema/mutation';
import { query } from './schema/query';
import { subscription } from './schema/subscription';
import { types } from './schema/query/types';

export const schema = makeSchema({
  types: [ 
    ...definitions,
    ...mutation,
    query,
    subscription,
    ...types,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
