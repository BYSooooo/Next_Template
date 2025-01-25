import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log(request)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-Forwarded-Host','api.themoviedb.org')
    const response = NextResponse.next({
        request: {
            headers : requestHeaders
        }
    })
    console.log(response)
}

export const config = {
    matcher : '/api/movies/popular'
}