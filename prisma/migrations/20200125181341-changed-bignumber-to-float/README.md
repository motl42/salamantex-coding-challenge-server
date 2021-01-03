# Migration `20200125181341-changed-bignumber-to-float`

This migration has been generated by Matthias Schaider at 1/25/2020, 6:13:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_User" (
  "description" TEXT    ,
  "email" TEXT NOT NULL DEFAULT ''  ,
  "id" TEXT NOT NULL   ,
  "maxAmountPerTranscationDollar" REAL NOT NULL DEFAULT 0  ,
  "name" TEXT NOT NULL DEFAULT ''  ,
  "password" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);

INSERT INTO "new_User" ("description","email","id","maxAmountPerTranscationDollar","name","password") SELECT "description","email","id","maxAmountPerTranscationDollar","name","password" from "User"

DROP TABLE "quaint"."User";

ALTER TABLE "quaint"."new_User" RENAME TO "User";

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;

PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_CurrencyAccount" (
  "balance" REAL NOT NULL DEFAULT 0  ,
  "currency" TEXT NOT NULL   REFERENCES "Currency"(id) ON DELETE RESTRICT,
  "id" TEXT NOT NULL   ,
  "user" TEXT NOT NULL   REFERENCES "User"(id) ON DELETE RESTRICT,
  "walletId" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);

INSERT INTO "new_CurrencyAccount" ("balance","currency","id","user","walletId") SELECT "balance","currency","id","user","walletId" from "CurrencyAccount"

DROP TABLE "quaint"."CurrencyAccount";

ALTER TABLE "quaint"."new_CurrencyAccount" RENAME TO "CurrencyAccount";

CREATE UNIQUE INDEX "quaint"."CurrencyAccount.walletId" ON "CurrencyAccount"("walletId")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;

PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Transaction" (
  "amount" REAL NOT NULL DEFAULT 0  ,
  "createdAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  "currency" TEXT NOT NULL   REFERENCES "Currency"(id) ON DELETE RESTRICT,
  "id" TEXT NOT NULL   ,
  "processedAt" DATE    ,
  "source" TEXT NOT NULL   REFERENCES "User"(id) ON DELETE RESTRICT,
  "state" TEXT NOT NULL DEFAULT 'Pending'  ,
  "target" TEXT NOT NULL   REFERENCES "User"(id) ON DELETE RESTRICT,
  PRIMARY KEY ("id")
);

INSERT INTO "new_Transaction" ("amount","createdAt","currency","id","processedAt","source","state","target") SELECT "amount","createdAt","currency","id","processedAt","source","state","target" from "Transaction"

DROP TABLE "quaint"."Transaction";

ALTER TABLE "quaint"."new_Transaction" RENAME TO "Transaction";

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200125084128-make-wallet-id-unique..20200125181341-changed-bignumber-to-float
--- datamodel.dml
+++ datamodel.dml
@@ -3,17 +3,17 @@
 }
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:dev.db"
 }
 model User {
   id       String  @default(cuid()) @id
   email    String  @unique
   password String
   name     String
-  maxAmountPerTranscationDollar String
+  maxAmountPerTranscationDollar Float
   description String?
   currencyAccounts  CurrencyAccount[]
   targetTransactions Transaction[] @relation(name: "targetUser")
   sourceTransactions Transaction[] @relation(name: "sourceUser")
@@ -28,9 +28,9 @@
 model CurrencyAccount {
   id          String @id @default(cuid())
   walletId    String @unique
-  balance     String
+  balance     Float
   currency    Currency
   user        User
 }
@@ -38,9 +38,9 @@
   id          String @id @default(cuid())
   createdAt   DateTime @default(now())
   processedAt DateTime?
   currency    Currency
-  amount      String
+  amount      Float
   target      User @relation(name: "targetUser")
   source      User @relation(name: "sourceUser")
   state       TransactionState
 }
```

