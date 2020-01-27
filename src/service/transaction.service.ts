
import { NexusGenInputs } from "../generated/nexus";
import { Context } from "../utils";
import BigNumber from "bignumber.js";
import { TransactionState, CurrencyAccount, TransactionError, TransactionUpdateInput } from "@prisma/photon";
import jopQueue from "../jopQueue";
import { Data } from "nexus-prisma/dist/dmmf";
import { getCurrencyAccountForUser } from "./currencyAccount.service";
import { isContext } from "vm";


export async function submitTransaction(ctx: Context, data: NexusGenInputs['SubmitTransactionInput']) {

    const transaction = await ctx.photon.transactions.create({
        data: {
            currency: {connect: {name: data.currencyName}},
            amount: data.amount,
            source: {connect: {id: ctx.userId}},
            target: {connect: {id: data.targetUserId}},
            state: 'Pending'
        }
    })

    jopQueue.addJob(async () => await processTransaction(ctx, transaction.id));

    return transaction;
}

export async function processTransaction(ctx: Context, transcationId: string) {

    let transaction = await ctx.photon.transactions.findOne({where: {id: transcationId}, include: {currency: true, target: true, source: true}});

    if(!transaction) {
        throw new Error('unexpected error');
    }

    let transactionError: TransactionError | undefined;

    const sourceCurrencyAccount = await getCurrencyAccountForUser(ctx, transaction.source.id, transaction.currency.id);
    if(!sourceCurrencyAccount) {
        transactionError = 'SOURCE_USER_NOT_HAVING_CURRENCY';
    }
    
    const targetCurrencyAccount = await getCurrencyAccountForUser(ctx, transaction.target.id, transaction.currency.id);
    if(!targetCurrencyAccount) {
        transactionError = 'TARGET_USER_NOT_HAVING_CURRENCY'
    }

    if(transaction.source.maxAmountPerTransactionDollar < 
        (transaction.currency.exchangeRateDollar * transaction.amount)) {
        transactionError = 'AMOUNT_TO_LARGE';
    }

    if(sourceCurrencyAccount && sourceCurrencyAccount.balance < transaction.amount) {
        transactionError = 'SOURCE_USER_NOT_ENOUGH_CURRENCY';
    }

    if(transactionError) {
        return await updateTransaction(ctx, transaction.id, {
            state: 'Failed',
            error: transactionError,
            processedAt: new Date()
        })
    }

    //hacky, I know
    if(!sourceCurrencyAccount || !targetCurrencyAccount) {
        return;
    }

    await ctx.photon.currencyAccounts.update({
        where: {id: sourceCurrencyAccount.id},
        data: {
            balance: sourceCurrencyAccount.balance - transaction.amount
        }
    })

    await ctx.photon.currencyAccounts.update({
        where: {id: targetCurrencyAccount.id},
        data: {
            balance: targetCurrencyAccount.balance + transaction.amount
        }
    })

    await updateTransaction(ctx, transaction.id, {
        state: 'Success',
        processedAt: new Date()
    })
}

async function updateTransaction(ctx: Context, id: string, data: TransactionUpdateInput) {
    return await ctx.photon.transactions.update({
        where: {id: id},
        data: data
    })
}


export async function findTransaction(ctx: Context, transactionId: string) {
    const transaction = await ctx.photon.transactions.findOne({where: {id: transactionId}, include: {source: true, target: true}});

    if(!transaction) {
        throw new Error('transaction does not exist');
    }

    if(transaction.source.id != ctx.userId) {
        throw new Error('not authorized');
    }

    return transaction;
}

export async function findTransactions(ctx: Context) {
    return await ctx.photon.transactions.findMany({
        where: {
            OR: [
                {
                    source: {id: ctx.userId}
                },
                {
                    target: {id: ctx.userId}
                }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
});
} 