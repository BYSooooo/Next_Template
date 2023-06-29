

/** Fetching TMDB - Popular Movie List 20 */
export async function getPopular() {
    const response = await fetch('/api/movies/popular')

    if(!response.ok) {
        throw new Error('Failed to Fetch Movie_Popular')
    }
    return response.json();
}