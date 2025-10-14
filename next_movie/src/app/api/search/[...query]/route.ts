import { NextResponse } from "next/server";
import { fetcher } from "../../../../lib/fetcher";

export async function GET(request: Request, { params } : {params : { query : string[]}}) {
    try {
        const keyword = params.query[0];
        const page = params.query[1] || '1';

        if(!keyword) {
            return new NextResponse(JSON.stringify({ message : "Search keyword is required"}), { status : 400});
        }

        const { searchParams } = new URL(request.url);
        const language = searchParams.get('language') || 'en';

        const queryString = `query=${keyword}&page=${page}&language=${language}`;

        const movieFetch = await fetcher('search/movie', queryString);
        const colFetch = await fetcher('search/collection',queryString);
        const companyFetch = await fetcher('search/company', queryString);
        const personFetch = await fetcher('search/person',queryString);

        const [ movieRes, collectionRes, companyRes, personRes ] = await Promise.allSettled([
            movieFetch, colFetch, companyFetch, personFetch
        ]);

        const failResult = { result : [], status : "Failed" };

        const data = {
            movie: movieRes.status === 'fulfilled' ? movieRes.value as MovieOverview : failResult,
            collection : collectionRes.status === 'fulfilled' ? collectionRes.value as CollectionInfo : failResult,
            company : companyRes.status === 'fulfilled' ? companyRes.value as CompanyInfo : failResult,
            person : personRes.status === 'fulfilled' ? personRes.value as PersonOverview : failResult
        }
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