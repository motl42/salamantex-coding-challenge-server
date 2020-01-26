import gql from 'graphql-tag';
import { getGqlSDK } from './utils';
import { SubmitTransactionInput } from './sdk';

gql` query transaction($transactionId: String!) {
    transaction(transactionId: $transactionId) {
        id,
        state,
        error,
        source {
            currencyAccounts {
                currency {
                    name
                },
                balance
            }
        },
        target {
            currencyAccounts {
                currency {
                    name
                },
                balance
            }
        }
}}`

gql` mutation submitTransaction($data: SubmitTransactionInput!) {
    submitTransaction(data: $data) {
            id,
            state
        }
}`

let gqlSdk = getGqlSDK();

describe("Transaction api", () => {

    beforeAll(async () => {

        await gqlSdk.dropAndSeedDB();

        const token = (await gqlSdk.login({
            email: 'steven@test.at',
            password: 'steven'
        })).login.token;

        gqlSdk = getGqlSDK(token);
    })

    it("submits transaction", async (done) => {

        const input = { 
            amount: 1.1,
            currencyName: 'bitcoin',
            targetUserId: 'user3'
        }


        await testTransaction({
            input,
            done,
            state: 'Success',
            sourceBalance: 1.1235346,
            targetBalance: 5.52612373
        })

    }, 10000)

    it("fails because target user has not the currency", async (done) => {

        const input = { 
            amount: 0.1,
            currencyName: 'ethereum',
            targetUserId: 'user3'
        }

        let transaction = (await gqlSdk.submitTransaction({
            data: input
        })).submitTransaction;

        await testTransaction({
            input,
            done,
            state: 'Failed',
            error: 'TARGET_USER_NOT_HAVING_CURRENCY'
        })

    }, 10000)

    it("fails because source user has not enough", async (done) => {

        const input = { 
            amount: 2.3,
            currencyName: 'bitcoin',
            targetUserId: 'user3'
        }

        await testTransaction({
            input,
            done,
            state: 'Failed',
            error: 'SOURCE_USER_NOT_ENOUGH_CURRENCY'
        })

    }, 10000)

    it("fails because target user has not the currency", async (done) => {

        const token = (await gqlSdk.login({
            email: 'mike@test.at',
            password: 'mike'
        })).login.token;

        gqlSdk = getGqlSDK(token);

        const input = { 
            amount: 2.3,
            currencyName: 'ethereum',
            targetUserId: 'user3'
        }

        await testTransaction({
            input,
            done,
            state: 'Failed',
            error: 'TARGET_USER_NOT_HAVING_CURRENCY'
        })

    }, 10000)

    it("fails because target user has not the currency", async (done) => {
    
        const input = { 
            amount: 20.3,
            currencyName: 'ethereum',
            targetUserId: 'user3'
        }

        await testTransaction({
            input,
            done,
            state: 'Failed',
            error: 'AMOUNT_TO_LARGE'
        })

        
    }, 10000);

    it("finds all transaction", async () => {

        gql` query transcations {
            transactions {
                id
            }
        }`

        const transactions = await gqlSdk.transcations();
        

        expect(transactions.transactions.length).toBe(6)
    })

})

async function testTransaction(args: {
    input: SubmitTransactionInput
    state: string
    error?: string
    targetBalance?: number
    sourceBalance?: number
    done: () => any
}) {

    let transaction = (await gqlSdk.submitTransaction({
        data: args.input
    })).submitTransaction;

    expect(transaction.id).toBeTruthy();
    expect(transaction.state).toBe('Pending');


    setTimeout(async () => {

        let fetchedTransaction = (await gqlSdk.transaction({transactionId: transaction.id})).transaction

        const targetCurrencyAccount = fetchedTransaction.target.currencyAccounts.find((ca) => ca.currency.name == 'bitcoin')
        const sourceCurrencyAccount = fetchedTransaction.source.currencyAccounts.find((ca) => ca.currency.name == 'bitcoin')

        expect(fetchedTransaction.state).toBe(args.state);

        if(args.error)
            expect(fetchedTransaction.error).toBe(args.error)

        if(args.sourceBalance)
            expect(sourceCurrencyAccount?.balance).toBe(args.sourceBalance);

        if(args.targetBalance)
            expect(targetCurrencyAccount?.balance).toBe(args.targetBalance);

        args.done();
    }, 2000)
}


