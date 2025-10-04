import { NextResponse } from "next/server";

export async function GET(request: Request, { params } : {params : { query : string[]}}) {

    const keyword = params.query[0];
    const page = params.query[1] || '1';

    if(!keyword) {
        return new NextResponse(JSON.stringify({ message : "Search keyword is required"}), { status : 400});
    }

    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'en';

    // To be Continue
}