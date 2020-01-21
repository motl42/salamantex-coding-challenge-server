import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  token: Scalars['String'],
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  dropAndSeedDB: Scalars['Boolean'],
  register: AuthResponse,
  login: AuthResponse,
};


export type MutationRegisterArgs = {
  data: RegisterInput
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  me: User,
};

export type RegisterInput = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  maxAmountPerTranscationDollar: Scalars['String'],
  description?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  maxAmountPerTranscationDollar: Scalars['String'],
};

export type DropAndSeedDbMutationVariables = {};


export type DropAndSeedDbMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dropAndSeedDB'>
);

export type RegisterMutationVariables = {
  user: RegisterInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'name' | 'description' | 'maxAmountPerTranscationDollar'>
    ) }
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name' | 'description' | 'maxAmountPerTranscationDollar'>
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'name' | 'description' | 'maxAmountPerTranscationDollar'>
    ) }
  ) }
);


export const DropAndSeedDbDocument = gql`
    mutation dropAndSeedDB {
  dropAndSeedDB
}
    `;
export const RegisterDocument = gql`
    mutation register($user: RegisterInput!) {
  register(data: $user) {
    token
    user {
      id
      email
      name
      description
      maxAmountPerTranscationDollar
    }
  }
}
    `;
export const MeDocument = gql`
    query me {
  me {
    id
    email
    name
    description
    maxAmountPerTranscationDollar
  }
}
    `;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      name
      description
      maxAmountPerTranscationDollar
    }
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    dropAndSeedDB(variables?: DropAndSeedDbMutationVariables): Promise<DropAndSeedDbMutation> {
      return client.request<DropAndSeedDbMutation>(print(DropAndSeedDbDocument), variables);
    },
    register(variables: RegisterMutationVariables): Promise<RegisterMutation> {
      return client.request<RegisterMutation>(print(RegisterDocument), variables);
    },
    me(variables?: MeQueryVariables): Promise<MeQuery> {
      return client.request<MeQuery>(print(MeDocument), variables);
    },
    login(variables: LoginMutationVariables): Promise<LoginMutation> {
      return client.request<LoginMutation>(print(LoginDocument), variables);
    }
  };
}