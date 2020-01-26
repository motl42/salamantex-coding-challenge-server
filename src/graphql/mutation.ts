import { compare, hash, compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { idArg, mutationType, stringArg, arg, objectType, inputObjectType } from 'nexus'
import { generateAuthToken } from '../auth'
import { UserCreateArgs } from '@prisma/photon';
import { dropData, seed } from '../dbUtils';
import * as yup from 'yup';
import { registerUser, loginUser } from '../service/user.service';
import { addCurrenyAccount, deleteCurrencyAccount } from "../service/currencyAccount.service";
import { submitTransaction } from '../service/transaction.service';

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

        return await registerUser(ctx, data);
      }
    })

    t.field('login', {
      type: 'AuthResponse',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, args, ctx) => {
        
        return await loginUser(ctx, args);
      }
    })

    t.field('addCurrencyAccount', {
      type: 'User',
      args: {
        data: arg({type: 'CurrencyAccountInput'})
      },
      async resolve(_parent, args, ctx) {

        return await addCurrenyAccount(ctx, args.data);
      }
    })

    t.field('deleteCurrencyAccount', {
      type: 'User',
      args: {
        currencyName: stringArg()
      },
      async resolve(_parent, args, ctx) {

        return await deleteCurrencyAccount(ctx, args.currencyName);
      }
    })

    t.field('submitTransaction', {
      type: 'Transaction',
      args: {
        data: inputObjectType({
          name: 'SubmitTransactionInput',
          definition(t) {
            t.string('targetUserId');
            t.string('currencyName');
            t.float('amount');
          }
        })
      },
      async resolve(parent, args, ctx) {
        console.log('userid', ctx.userId);
        
        return await submitTransaction(ctx, args.data);
      }
    })

  }
})
