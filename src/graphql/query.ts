import { idArg, queryType, stringArg } from 'nexus'
import { findUser } from '../service/user.service';
import { findTransaction, findTransactions } from '../service/transaction.service';

export const Query = queryType({

  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: async (parent, args, ctx) => {
        return await findUser(ctx);
      }
    })

    t.field('transaction', {
      type: 'Transaction',
      args: {
        transactionId: stringArg()
      },
      resolve: async (parent, args, ctx) => {
        
        const transaction = await ctx.photon.transactions.findOne({where: {id: args.transactionId}, include: {source: true, target: true}});

        if(!transaction) {
          throw new Error('transaction does not exist');
        }

        if(transaction.source.id != ctx.userId) {
          throw new Error('not authorized');
        }

        return transaction;
      }
    });

    t.list.field('transactions', {
      type: 'Transaction',
      resolve: async (parent, args, ctx) => {
        
        return await findTransactions(ctx);
      }
    })
  }
})
