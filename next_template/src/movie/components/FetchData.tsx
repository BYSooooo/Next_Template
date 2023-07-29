import { useAppSelector } from "@/redux/hook";

/** Fetching TMDB - Popular Movie List 20 */
export async function getPopular() {
    try {
        const response = await (await fetch('/api/movies/popular')).json();
        return response.results;
    } catch (err) {
        throw new Error('Failed to Fetch Movie_Popular')
    }

}
/** Fetching TMDB - Movie Genre List */
export async function getGenre() {
    try {
        const response = await (await fetch ('/api/movies/genreList')).json();
        return response.genres
    } catch (err) {
        throw new Error('Failed to Fetch Movie_GenreList')
    }
}

/** Fetching TMDB - Movie Search by Fitering */
export async function search(query: string) {
    console.log(query)
    try {
        const response = await (await fetch (`/api/movies/search/${query}`)).json();
        return response
    } catch(err) {
        throw new Error('Failed to Fetch Movie_search')
    }
}