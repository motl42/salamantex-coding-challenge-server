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
  Monetary: any,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  token: Scalars['String'],
  user: User,
};

export type Currency = {
   __typename?: 'Currency',
  id: Scalars['ID'],
  name: Scalars['String'],
  exchangeRateDollar: Scalars['Float'],
};

export type CurrencyAccount = {
   __typename?: 'CurrencyAccount',
  id: Scalars['ID'],
  balance: Scalars['Float'],
  walletId: Scalars['String'],
  currency: Currency,
};

export type CurrencyAccountInput = {
  walletId: Scalars['String'],
  balance: Scalars['Float'],
  currencyName: Scalars['String'],
};


export type Mutation = {
   __typename?: 'Mutation',
  dropAndSeedDB: Scalars['Boolean'],
  register: AuthResponse,
  login: AuthResponse,
  addCurrencyAccount: User,
  deleteCurrencyAccount: User,
  submitTransaction: Transaction,
};


export type MutationRegisterArgs = {
  data: RegisterInput
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationAddCurrencyAccountArgs = {
  data: CurrencyAccountInput
};


export type MutationDeleteCurrencyAccountArgs = {
  currencyName: Scalars['String']
};


export type MutationSubmitTransactionArgs = {
  data: SubmitTransactionInput
};

export type Query = {
   __typename?: 'Query',
  currencies: Array<Currency>,
  me: User,
  transaction: Transaction,
  transactions: Array<Transaction>,
  otherUsers: Array<User>,
};


export type QueryTransactionArgs = {
  transactionId: Scalars['String']
};

export type RegisterInput = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  maxAmountPerTransactionDollar: Scalars['Float'],
  description?: Maybe<Scalars['String']>,
};

export type SubmitTransactionInput = {
  targetUserId: Scalars['String'],
  currencyName: Scalars['String'],
  amount: Scalars['Float'],
};

export type Transaction = {
   __typename?: 'Transaction',
  id: Scalars['ID'],
  amount: Scalars['Float'],
  currency: Currency,
  createdAt: Scalars['String'],
  processedAt?: Maybe<Scalars['String']>,
  target: User,
  source: User,
  state: Scalars['String'],
  error?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  maxAmountPerTransactionDollar: Scalars['Float'],
  currencyAccounts: Array<CurrencyAccount>,
};

export type AddCurrencyAccountMutationVariables = {
  data: CurrencyAccountInput
};


export type AddCurrencyAccountMutation = (
  { __typename?: 'Mutation' }
  & { addCurrencyAccount: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { currencyAccounts: Array<(
      { __typename?: 'CurrencyAccount' }
      & Pick<CurrencyAccount, 'id' | 'balance' | 'walletId'>
      & { currency: (
        { __typename?: 'Currency' }
        & Pick<Currency, 'name'>
      ) }
    )> }
  ) }
);

export type DeleteCurrencyAccountMutationVariables = {
  currencyName: Scalars['String']
};


export type DeleteCurrencyAccountMutation = (
  { __typename?: 'Mutation' }
  & { deleteCurrencyAccount: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { currencyAccounts: Array<(
      { __typename?: 'CurrencyAccount' }
      & Pick<CurrencyAccount, 'id' | 'balance' | 'walletId'>
      & { currency: (
        { __typename?: 'Currency' }
        & Pick<Currency, 'name'>
      ) }
    )> }
  ) }
);

export type TransactionQueryVariables = {
  transactionId: Scalars['String']
};


export type TransactionQuery = (
  { __typename?: 'Query' }
  & { transaction: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'state' | 'error'>
    & { source: (
      { __typename?: 'User' }
      & { currencyAccounts: Array<(
        { __typename?: 'CurrencyAccount' }
        & Pick<CurrencyAccount, 'balance'>
        & { currency: (
          { __typename?: 'Currency' }
          & Pick<Currency, 'name'>
        ) }
      )> }
    ), target: (
      { __typename?: 'User' }
      & { currencyAccounts: Array<(
        { __typename?: 'CurrencyAccount' }
        & Pick<CurrencyAccount, 'balance'>
        & { currency: (
          { __typename?: 'Currency' }
          & Pick<Currency, 'name'>
        ) }
      )> }
    ) }
  ) }
);

export type SubmitTransactionMutationVariables = {
  data: SubmitTransactionInput
};


export type SubmitTransactionMutation = (
  { __typename?: 'Mutation' }
  & { submitTransaction: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'state'>
  ) }
);

export type TranscationsQueryVariables = {};


export type TranscationsQuery = (
  { __typename?: 'Query' }
  & { transactions: Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id'>
  )> }
);

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
      & Pick<User, 'id' | 'email' | 'name' | 'description' | 'maxAmountPerTransactionDollar'>
    ) }
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name' | 'description' | 'maxAmountPerTransactionDollar'>
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
      & Pick<User, 'id' | 'email' | 'name' | 'description' | 'maxAmountPerTransactionDollar'>
    ) }
  ) }
);


export const AddCurrencyAccountDocument = gql`
    mutation addCurrencyAccount($data: CurrencyAccountInput!) {
  addCurrencyAccount(data: $data) {
    id
    name
    currencyAccounts {
      id
      balance
      walletId
      currency {
        name
      }
    }
  }
}
    `;
export const DeleteCurrencyAccountDocument = gql`
    mutation deleteCurrencyAccount($currencyName: String!) {
  deleteCurrencyAccount(currencyName: $currencyName) {
    id
    name
    currencyAccounts {
      id
      balance
      walletId
      currency {
        name
      }
    }
  }
}
    `;
export const TransactionDocument = gql`
    query transaction($transactionId: String!) {
  transaction(transactionId: $transactionId) {
    id
    state
    error
    source {
      currencyAccounts {
        currency {
          name
        }
        balance
      }
    }
    target {
      currencyAccounts {
        currency {
          name
        }
        balance
      }
    }
  }
}
    `;
export const SubmitTransactionDocument = gql`
    mutation submitTransaction($data: SubmitTransactionInput!) {
  submitTransaction(data: $data) {
    id
    state
  }
}
    `;
export const TranscationsDocument = gql`
    query transcations {
  transactions {
    id
  }
}
    `;
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
      maxAmountPerTransactionDollar
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
    maxAmountPerTransactionDollar
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
      maxAmountPerTransactionDollar
    }
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    addCurrencyAccount(variables: AddCurrencyAccountMutationVariables): Promise<AddCurrencyAccountMutation> {
      return client.request<AddCurrencyAccountMutation>(print(AddCurrencyAccountDocument), variables);
    },
    deleteCurrencyAccount(variables: DeleteCurrencyAccountMutationVariables): Promise<DeleteCurrencyAccountMutation> {
      return client.request<DeleteCurrencyAccountMutation>(print(DeleteCurrencyAccountDocument), variables);
    },
    transaction(variables: TransactionQueryVariables): Promise<TransactionQuery> {
      return client.request<TransactionQuery>(print(TransactionDocument), variables);
    },
    submitTransaction(variables: SubmitTransactionMutationVariables): Promise<SubmitTransactionMutation> {
      return client.request<SubmitTransactionMutation>(print(SubmitTransactionDocument), variables);
    },
    transcations(variables?: TranscationsQueryVariables): Promise<TranscationsQuery> {
      return client.request<TranscationsQuery>(print(TranscationsDocument), variables);
    },
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