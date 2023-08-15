-- CreateTable
CREATE TABLE "Product" (
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL PRIMARY KEY,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
