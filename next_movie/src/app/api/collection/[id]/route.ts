import { NextResponse } from "next/server";
import { fetcher } from "../../../../lib/fetcher";

interface routeParams {
    params : {
        id : string
    }
}

export async function GET(request: Request, {params} : routeParams) {
    try {
        const { id : collectionId } = await params;
        const { searchParams } = new URL(request.url);
        const queryString = searchParams.toString();

        const data = await fetcher(`collection/${collectionId}`, queryString);
        debugger;
        return NextResponse.json(data);

    } catch(error) {
        debugger;
        if(error instanceof Error) {
            try {
                const errorDetail = JSON.parse(error.message);
                return new NextResponse(JSON.stringify(errorDetail),  { status: errorDetail.status || 500 })
            } catch {
                return new NextResponse(JSON.stringify({ message : "Internal server error"}), { status : 500})
            }
        }
    }
}