import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const onClickTest = async()=> {
    await prisma.user.create({
        data : {
            name : "test",
            email : "testUser@example.com"
        }
    });
    const users = await prisma.user.findMany();
    console.log(users)
}