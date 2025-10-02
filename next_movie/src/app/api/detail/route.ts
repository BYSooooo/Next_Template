import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const queryString = searchParams.toString();

        // const data = await fetcher("/");

        // {
        //         source : "/api/movies/detail/:query",
        //         destination : `https://api.themoviedb.org/3/movie/:query?api_key=${API_KEY}&append_to_response=videos,images,credits`
        //     },

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