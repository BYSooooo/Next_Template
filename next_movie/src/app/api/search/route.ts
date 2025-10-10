import { NextResponse } from "next/server";
import { fetcher } from "../../../lib/fetcher";

export async function GET(request: Request, { params } : {params : { query : string[]}}) {
    try {
        const keyword = params.query[0];
        const page = params.query[1] || '1';

        console.log(keyword)
        if(!keyword) {
            return new NextResponse(JSON.stringify({ message : "Search keyword is required"}), { status : 400});
        }

        const { searchParams } = new URL(request.url);
        const language = searchParams.get('language') || 'en';

        const queryString = `query=${keyword}&page=${page}&language=${language}`;

        const data = await fetcher('search/multi', queryString);
        
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