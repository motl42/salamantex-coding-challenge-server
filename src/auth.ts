import { rule, shield } from 'graphql-shield'
import { sign, verify } from 'jsonwebtoken'
import { User } from '@prisma/photon'
import { Context } from './utils'

export const JWT_SECRET = 'appsecret321'

const rules = {
  isAuthenticatedUser: rule() (async (parent, args, context) => {
    
    return await authenticateUser(context);
  })
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser
  },
  Mutation: {
    addCurrencyAccount: rules.isAuthenticatedUser,
    deleteCurrencyAccount: rules.isAuthenticatedUser
  }
});


interface Token {
  userId: string
}

export async function authenticateUser(context: Context) {
  const Authorization = context.request.get('Authorization')

  if (!Authorization) {
    return false;
  }

  const userId = getUserIdFromToken(Authorization);
  const user = await context.photon.users.findOne({ where: { id: userId }});

  if(!user) {
    return false
  }

  context.userId = user.id;

  return true;
}


export function generateAuthToken(user: User) {
  return sign({userId: user.id}, JWT_SECRET);
}

export function getUserIdFromToken(token: string) {
  const tokenPayload = verify(token, JWT_SECRET) as Token;
  return tokenPayload.userId;
}
