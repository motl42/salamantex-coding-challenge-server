import { compare, hash, compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { idArg, mutationType, stringArg, arg } from 'nexus'
import { generateAuthToken } from '../auth'
import { UserCreateArgs } from '@prisma/photon';
import { dropData, seed } from '../dbUtils';
import * as yup from 'yup';

export const Mutation = mutationType({

  definition(t) {

    t.boolean('dropAndSeedDB', {
      async resolve() {
        await dropData();
        await seed();

        return true;
      }
    })

    t.field('register', {
      type: 'AuthResponse',
      args: {
        data: arg({ type: 'RegisterInput'})
      },
      resolve: async (parent, { data }, ctx) => {

        if(!yup.string().email().validateSync(data.email)) {
          throw new Error("E-Mail is not valid");
        }

        const user = await ctx.photon.users.create({
          data: {
            ...data,
            password: await hash(data.password, 10),
          }
        })

        return {
          token: generateAuthToken(user),
          user
        }
      }
    })

    t.field('login', {
      type: 'AuthResponse',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (_parent, { email, password }, context) => {
        
        const user = await context.photon.users.findOne({ where: { email } })

        if (!user || !compareSync(password, user.password)) {
          throw new Error('Password or user is wrong');
        }

        return {
          token: generateAuthToken(user),
          user,
        }
      }
    })

  }
})
