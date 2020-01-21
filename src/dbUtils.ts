import { Photon } from '@prisma/photon'
import { hashSync } from 'bcryptjs'
const photon = new Photon()

export async function seed() {

  const user1 = await photon.users.create({
    data: {
      email: 'bob@test.at',
      name: 'Bob',
      password: hashSync('hannes', 10),
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
  await photon.users.deleteMany({});

  console.log('all data deleted');
}
