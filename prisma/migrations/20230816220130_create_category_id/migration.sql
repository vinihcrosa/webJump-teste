/*
  Warnings:

  - The primary key for the `CategoriesOnProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryName` on the `CategoriesOnProduct` table. All the data in the column will be lost.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `CategoriesOnProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoriesOnProduct" (
    "productSku" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("categoryId", "productSku"),
    CONSTRAINT "CategoriesOnProduct_productSku_fkey" FOREIGN KEY ("productSku") REFERENCES "Product" ("sku") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CategoriesOnProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CategoriesOnProduct" ("createdAt", "productSku") SELECT "createdAt", "productSku" FROM "CategoriesOnProduct";
DROP TABLE "CategoriesOnProduct";
ALTER TABLE "new_CategoriesOnProduct" RENAME TO "CategoriesOnProduct";
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Category" ("createdAt", "name", "updatedAt") SELECT "createdAt", "name", "updatedAt" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
