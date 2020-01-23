import gql from 'graphql-tag';
import { getSdk } from './sdk';
import { GraphQLClient } from 'graphql-request';
import { getGqlSDK } from './utils';


let gqlSdk = getGqlSDK();

describe("User api", () => {

    beforeAll(async () => {

        await gqlSdk.dropAndSeedDB();

        const token = (await gqlSdk.login({
            email: 'bob@test.at',
            password: 'bob'
        })).login.token;

        gqlSdk = getGqlSDK(token);
    })

    it("adds bitcoin wallet", async () => {

        gql` mutation addCurrencyAccount($data: CurrencyAccountInput!) {
            addCurrencyAccount(data: $data) {
                    id,
                    name,
                    currencyAccounts {
                        id,
                        balance,
                        walletId,
                        currency {
                            name
                        }
                    }
                }
            }`

        const input = { 
            balance: '34.5',
            currencyName: 'bitcoin',
            walletId: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
        }

        const currencyAccount = (await gqlSdk.addCurrencyAccount({
            data: input
        })).addCurrencyAccount.currencyAccounts[0];

        expect(currencyAccount.balance).toBe(input.balance);
        expect(currencyAccount.walletId).toBe(input.walletId);
        expect(currencyAccount.currency.name).toBe(input.currencyName);

    })

    it("cannot add bitcoin wallet again", async () => {

        const input = { 
            balance: '34.5',
            currencyName: 'bitcoin',
            walletId: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
        }

        await expect(gqlSdk.addCurrencyAccount({
            data: input
        })).rejects.toThrow()
    })

    it("deletes bitcoin wallet", async () => {

        gql` mutation deleteCurrencyAccount($currencyName: String!) {
            deleteCurrencyAccount(currencyName: $currencyName) {
                id,
                name,
                currencyAccounts {
                    id,
                    balance,
                    walletId,
                    currency {
                        name
                    }
                }
            }
        }`

        const currencyAccounts = (await gqlSdk.deleteCurrencyAccount({currencyName: 'bitcoin'})).deleteCurrencyAccount.currencyAccounts;

        expect(currencyAccounts.length).toBe(0);
    })
})

