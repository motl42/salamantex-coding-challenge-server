import { idArg, queryType, stringArg } from 'nexus'

export const Query = queryType({

  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: async (parent, args, ctx) => {
        const user = await ctx.photon.users.findOne({
          where: {
            id: ctx.userId
          }
        });

        if(!user) {
          throw new Error("unexpected error");
        }

        return user;
      }
    })
  }
})
