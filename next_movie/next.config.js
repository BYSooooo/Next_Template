
/** @type {import('next').NextConfig}  */

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

const nextConfig = {
    async rewirtes() {
        return [
            {
                source : "/api/movies/popular",
                destination : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
            }
        ]
    } 
}

module.exports = nextConfig;