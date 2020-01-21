import { objectType, inputObjectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.description()
    t.model.maxAmountPerTranscationDollar()
  },
});

export const RegisterInput = inputObjectType({
    name: 'RegisterInput',
    nonNullDefaults: {
        input: true
    },
    definition(t) {
        t.string('name')
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
  