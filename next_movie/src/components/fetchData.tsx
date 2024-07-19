export async function getPopular() {
    try {
        const response = await (await fetch('/api/movies/popular')).json();
        return response.results;
    } catch (err) {
        throw new Error('Failed to Fetch Movie_Popular')
    }

}