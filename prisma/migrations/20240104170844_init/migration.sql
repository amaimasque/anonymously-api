-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "password" VARCHAR NOT NULL,
    "dateOfBirth" VARCHAR(10) NOT NULL,
    "dateCreated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "dateDelete" TIMESTAMP(6),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thought" (
    "id" SERIAL NOT NULL,
    "post" VARCHAR NOT NULL,
    "photo" VARCHAR NOT NULL,
    "userId" INTEGER,
    "dateCreated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "dateDelete" TIMESTAMP(6),

    CONSTRAINT "thought_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insight" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR NOT NULL,
    "userId" INTEGER,
    "thoughtId" INTEGER,
    "dateCreated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "dateDelete" TIMESTAMP(6),

    CONSTRAINT "insight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reaction" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR NOT NULL,
    "userId" INTEGER,
    "thoughtId" INTEGER,
    "dateCreated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "dateDelete" TIMESTAMP(6),

    CONSTRAINT "reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "dateCreated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "dateDelete" TIMESTAMP(6),
    "senderId" INTEGER,
    "receiverId" INTEGER,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "thought" ADD CONSTRAINT "thought_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "insight" ADD CONSTRAINT "insight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "insight" ADD CONSTRAINT "insight_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "thought"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "thought"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
