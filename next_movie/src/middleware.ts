import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-Forwarded-Host','api.themoviedb.org')
    const response = NextResponse.next({
        request: {
            headers : requestHeaders
        }
    })
}

export const config = {
    matcher : '/api/movies/popular'
}