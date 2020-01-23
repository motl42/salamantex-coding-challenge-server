import { objectType, inputObjectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.description()
    t.model.maxAmountPerTranscationDollar()
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
        t.string('maxAmountPerTranscationDollar')
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
      t.string('balance')
      t.string('currencyName')
    }
  })
  