/*
  Warnings:

  - You are about to drop the column `url` on the `videos` table. All the data in the column will be lost.
  - Added the required column `path` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_id` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_videos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_videos" ("created_at", "id") SELECT "created_at", "id" FROM "videos";
DROP TABLE "videos";
ALTER TABLE "new_videos" RENAME TO "videos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
