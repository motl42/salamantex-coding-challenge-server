import { Photon } from '@prisma/photon'
import { hashSync } from 'bcryptjs'
const photon = new Photon()

export async function seed() {

  const bitcoin = await photon.currencies.create({
    data: {
      name: 'bitcoin',
      exchangeRateDollar: 8642.09,
      addressRegExp: '^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$'
    }
  })
  const ethereum = await photon.currencies.create({
    data: {
      name: 'ethereum',
      exchangeRateDollar: 167.76,
      addressRegExp: '^0x[a-fA-F0-9]{40}$'
    }
  })

  const user1 = await photon.users.create({
    data: {
      email: 'bob@test.at',
      name: 'Bob',
      password: hashSync('bob', 10),
      maxAmountPerTransactionDollar: 500
    }
  })

  const user2 = await photon.users.create({
    data: {
      id: 'user2',
      email: 'steven@test.at',
      name: 'Steven',
      password: hashSync('steven', 10),
      maxAmountPerTransactionDollar: 15000,
      currencyAccounts: {
        create: [
          {
            currency: {connect: {id: bitcoin.id}},
            balance: 2.2235346,
            walletId: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
          },
          {
            currency: {connect: {id: ethereum.id}},
            balance: 74.82523532,
            walletId: "0xc052c6ca435797d7c110e7a2c3562784f5095f3d"
          }
        ]
      }
    }
  })

  const user3 = await photon.users.create({
    data: {
      id: 'user3',
      email: 'mike@test.at',
      name: 'Mike',
      password: hashSync('mike', 10),
      maxAmountPerTransactionDollar: 750,
      currencyAccounts: {
        create: [
          {
            currency: {connect: {id: bitcoin.id}},
            balance: 4.42612373,
            walletId: "36jCUtQGqYbGmWr7Apyr3PcmNwKzPyCZXf"
          }
        ]
      }
    }
  })

  console.log('seed inserted');
}

export async function dropData() {

  await photon.transactions.deleteMany({});
  await photon.currencyAccounts.deleteMany({});
  await photon.users.deleteMany({});
  await photon.currencies.deleteMany({});

  console.log('all data deleted');
}
