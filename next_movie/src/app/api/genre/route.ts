import { NextResponse } from "next/server";
import { fetcher } from "../../../lib/fetcher";

export async function GET(request : Request) {
    try {
        const { searchParams } = new URL(request.url);
        const queryString = searchParams.toString();

        const data = await fetcher('genre/movie/list', queryString);

        return NextResponse.json(data);

    } catch(error) {
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