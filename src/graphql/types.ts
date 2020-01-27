import { objectType, inputObjectType, scalarType } from 'nexus'
import Bignumber from 'bignumber.js';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.description()
    t.model.maxAmountPerTransactionDollar()
    t.model.currencyAccounts({
        type: 'CurrencyAccount',
        pagination: false
    })
  },
});

export const CurrencyAccount = objectType({
    name: 'CurrencyAccount',
    definition(t) {
        t.model.id();
        t.model.balance();
        t.model.walletId();
        t.model.currency({
            type: 'Currency'
        })
    }
})

export const Currency = objectType({
    name: 'Currency',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.exchangeRateDollar()
    }
})

export const RegisterInput = inputObjectType({
    name: 'RegisterInput',
    nonNullDefaults: {
        input: true
    },
    definition(t) {
        t.string('name')
        t.string('email')
        t.string('password')
        t.float('maxAmountPerTransactionDollar')
        t.string('description', {nullable: true})
    }
})

export const AuthResponse = objectType({
    name: 'AuthResponse',
    definition(t) {
      t.string('token')
      t.field('user', { type: 'User' })
    },
})

export const CurrencyAccountInput = inputObjectType({
    name: 'CurrencyAccountInput',
    definition(t) {
      t.string('walletId')
      t.float('balance')
      t.string('currencyName')
    }
})

export const Transaction = objectType({
    name: 'Transaction',
    definition(t) {
        t.model.id()
        t.model.amount();
        t.model.currency();
        t.string('createdAt', {
            resolve(t) {
                return t.createdAt.toISOString();
            }
        });
        t.string('processedAt', {
            resolve(t) {
                if(!t.processedAt) 
                    return null;
                return t.processedAt.toISOString();
            },
            nullable: true
        });
        t.model.amount();
        t.model.target();
        t.model.source();
        t.string('state');
        t.string('error', {nullable: true});
    }
})
  
export const MonetaryType = scalarType({
    name: "Monetary",
    asNexusMethod: "monetary",
    description: "Monetary value type",
    parseValue(value) {
      return new Bignumber(value);
    },
    serialize(value) {
      return value.toFixed(2);
    }
  });