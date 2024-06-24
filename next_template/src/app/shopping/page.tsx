import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default function ShoppingPage() {

    const onClickTest = async()=> {
        await prisma.user.create({
            data : {
                name : "test",
                email : "testUser@example.com"
            }
        })
    }

    return (
        <div className="mt-20">
            <button onClick={onClickTest}>

            </button>
        </div>
    )
}