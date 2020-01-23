# Failed inferMigrationSteps at 2020-01-21T14:30:52.126Z
## RPC One-Liner
```json
{"id":2,"jsonrpc":"2.0","method":"inferMigrationSteps","params":{"projectInfo":"","sourceConfig":"generator photon {\n  provider = \"photonjs\"\n}\n\ndatasource db {\n  provider = \"sqlite\"\n  url      = \"file:dev.db\"\n}\n\nmodel User {\n  id       String  @default(cuid()) @id\n  email    String  @unique\n  password String\n  name     String\n  maxAmountPerTranscationDollar String\n  description String?\n  currencyAccounts  Currency[]\n}\n\nmodel Currency {\n  id       String  @default(cuid()) @id\n  name    String  @unique\n  exchangeRateDollar String\n}\n\nmodel CurrencyAccount {\n  id          String @id @default(cuid())\n  walletId    String\n  balance     String\n  currency    Currency\n  user        User @relation(references: id)\n}","datamodel":"generator photon {\n  provider = \"photonjs\"\n}\n\ndatasource db {\n  provider = \"sqlite\"\n  url      = \"file:dev.db\"\n}\n\nmodel User {\n  id       String  @default(cuid()) @id\n  email    String  @unique\n  password String\n  name     String\n  maxAmountPerTranscationDollar String\n  description String?\n  currencyAccounts  Currency[]\n}\n\nmodel Currency {\n  id       String  @default(cuid()) @id\n  name    String  @unique\n  exchangeRateDollar String\n}\n\nmodel CurrencyAccount {\n  id          String @id @default(cuid())\n  walletId    String\n  balance     String\n  currency    Currency\n  user        User @relation(references: id)\n}","migrationId":"DUMMY_NAME","assumeToBeApplied":[]}}
```

## RPC Input Readable
```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "inferMigrationSteps",
  "params": {
    "projectInfo": "",
    "sourceConfig": "generator photon {\n  provider = \"photonjs\"\n}\n\ndatasource db {\n  provider = \"sqlite\"\n  url      = \"file:dev.db\"\n}\n\nmodel User {\n  id       String  @default(cuid()) @id\n  email    String  @unique\n  password String\n  name     String\n  maxAmountPerTranscationDollar String\n  description String?\n  currencyAccounts  Currency[]\n}\n\nmodel Currency {\n  id       String  @default(cuid()) @id\n  name    String  @unique\n  exchangeRateDollar String\n}\n\nmodel CurrencyAccount {\n  id          String @id @default(cuid())\n  walletId    String\n  balance     String\n  currency    Currency\n  user        User @relation(references: id)\n}",
    "datamodel": "generator photon {\n  provider = \"photonjs\"\n}\n\ndatasource db {\n  provider = \"sqlite\"\n  url      = \"file:dev.db\"\n}\n\nmodel User {\n  id       String  @default(cuid()) @id\n  email    String  @unique\n  password String\n  name     String\n  maxAmountPerTranscationDollar String\n  description String?\n  currencyAccounts  Currency[]\n}\n\nmodel Currency {\n  id       String  @default(cuid()) @id\n  name    String  @unique\n  exchangeRateDollar String\n}\n\nmodel CurrencyAccount {\n  id          String @id @default(cuid())\n  walletId    String\n  balance     String\n  currency    Currency\n  user        User @relation(references: id)\n}",
    "migrationId": "DUMMY_NAME",
    "assumeToBeApplied": []
  }
}
```

## Stack Trace
```bash
Jan 21 15:30:52.108  INFO migration_engine: Starting migration engine RPC server git_hash="e7579bd35e0938dbf773f1706c098a0d14a5a038"
Jan 21 15:30:52.110  INFO quaint::single: Starting a sqlite pool with 1 connections.    
Jan 21 15:30:52.114  INFO ListMigrations: migration_engine::commands::list_migrations: Returning 3 migrations (0 pending).
```
