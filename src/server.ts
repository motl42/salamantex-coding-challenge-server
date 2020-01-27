import { GraphQLServer } from 'graphql-yoga'
import { permissions } from './auth'
import { createContext } from './utils'
import { makeSchema } from 'nexus'
import {nexusPrismaPlugin} from 'nexus-prisma';
import * as types from './graphql';
import { dropData, seed } from './dbUtils';

const schema = makeSchema({
  types: types,
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./utils'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
  nonNullDefaults: {
    input: true,
    output: true
  }
})


new GraphQLServer({
  schema,
  context: createContext,
  middlewares: [permissions],
}).start(async () => {

  await dropData();
  await seed();

  console.log(
    `🚀 Server ready at: http://localhost:4000`,
  )
})
