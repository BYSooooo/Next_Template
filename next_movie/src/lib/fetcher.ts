const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if(!API_KEY) {
    throw new Error("Error!")
}

export async function fetcher<T>(path : string, queryString : string) : Promise<T> {
    const TMDB_URL = `${BASE_URL}/${path}?api_key=${API_KEY}&${queryString}`;
    
    const response = await fetch(TMDB_URL);

    if(!response.ok) {
        const error = await response.json();
        throw new Error(JSON.stringify({
            status : response.status,
            message : `ERROR : ${response.statusText}`,
            detail : error
        }))
    }

    return response.json() as Promise<T>;
}

