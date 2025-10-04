
/** @type {import('next').NextConfig}  */

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

const nextConfig= {
    async rewrites() {
        return [
            {
                source : "/api/movies/person/:query",
                destination : `https://api.themoviedb.org/3/person/:query?api_key=${API_KEY}&append_to_response=combined_credits`
            },
            {
                source : "/api/movies/search/movie/:query",
                destination : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}:query`
            },
            {
                source : "/api/movies/search/person/:query",
                destination : `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}:query`
            }

        ]
    } 
}

module.exports = nextConfig;