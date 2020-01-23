import { Photon } from '@prisma/photon'
import { hashSync } from 'bcryptjs'
const photon = new Photon()

export async function seed() {

  await photon.currencies.create({
    data: {
      name: 'bitcoin',
      exchangeRateDollar: '8642.09',
      addressRegExp: '^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$'
    }
  })
  await photon.currencies.create({
    data: {
      name: 'ethereum',
      exchangeRateDollar: '167.76',
      addressRegExp: '^0x[a-fA-F0-9]{40}$'
    }
  })


  const user1 = await photon.users.create({
    data: {
      email: 'bob@test.at',
      name: 'Bob',
      password: hashSync('bob', 10),
      maxAmountPerTranscationDollar: '500'
    }
  })

  const user2 = await photon.users.create({
    data: {
      email: 'steven@ptest',
      name: 'Steven',
      password: hashSync('steven', 10),
      maxAmountPerTranscationDollar: '750'
    }
  })

  console.log('seed inserted');
}

export async function dropData() {

  await photon.currencyAccounts.deleteMany({});
  await photon.users.deleteMany({});
  await photon.currencies.deleteMany({});

  console.log('all data deleted');
}
