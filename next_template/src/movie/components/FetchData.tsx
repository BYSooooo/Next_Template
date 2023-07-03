import { setGenreList, setPopularList } from "@/redux/features/movieReducer";
import { useAppDispatch } from "@/redux/hook";


/** Fetching TMDB - Popular Movie List 20 */
export async function getPopular() {
    const dispatch= useAppDispatch()
    try {
        const response = await (await fetch('/api/movies/popular')).json();
        dispatch(setPopularList(response.results))
    } catch (err) {
        throw new Error('Failed to Fetch Movie_Popular')
    }

}
/** Fetching TMDB - Movie Genre List */
export async function getGenre() {
    const dispatch = useAppDispatch()
    try {
        const response = await (await fetch ('/api/movies/genreList')).json();
        dispatch(setGenreList(response.results));
    } catch (err) {
        throw new Error('Failed to Fetch Movie_GenreList')
    }
}