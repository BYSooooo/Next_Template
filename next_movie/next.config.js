
/** @type {import('next').NextConfig}  */

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

const nextConfig = {
    async rewrites() {
        return [
            {
                source : "/api/movies/popular",
                destination : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
            },
            {
                source : "/api/movies/genre",
                destination : `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`            
            },
            {
                source : "/api/movies/topRate",
                destination : `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`            
            }
        ]
    } 
}

module.exports = nextConfig;