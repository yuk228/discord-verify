-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "globalName" TEXT NOT NULL,
    "avatarId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "mfaEnabled" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE INDEX "users_userId_idx" ON "users"("userId");

-- CreateIndex
CREATE INDEX "users_ip_idx" ON "users"("ip");
