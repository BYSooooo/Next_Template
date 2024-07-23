import { useAppDispatch } from "../redux/hooks";

export async function getPopular() {
    try {
        const response = await (await fetch('/api/movies/popular')).json();
        console.log(response.results)
        return response.results;
    } catch (err) {
        console.log(err)
        throw new Error('Failed to Fetch Movie_Popular')
    }
}