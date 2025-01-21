
/** @type {import('next').NextConfig}  */

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

const nextConfig= {
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
            },
            {
                source : "/api/movies/upComing",
                destination : `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
            },
            {
                source : "/api/movies/detail/:query",
                destination : `https://api.themoviedb.org/3/movie/:query?api_key=${API_KEY}&append_to_response=videos,images,credits`
            },
            {
                source : "/api/movies/person/:query",
                destination : `https://api.themoviedb.org/3/person/:query?api_key=${API_KEY}&append_to_response=combined_credits`
            },
            {
                source : "/api/movies/collection/:query",
                destination : `https://api.themoviedb.org/3/collection/:query?api_key=${API_KEY}`
            },
            {
                source : "/api/movies/company/:query",
                destination : `https://api.themoviedb.org/3/company/:query?api_key=${API_KEY}`
            },
            {
                source : "/api/movies/search/movie/:query",
                destination : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}:query`
            },
            {
                source : "/api/movies/search/collection/:query",
                destination : `https://api.themoviedb.org/3/search/collection?api_key=${API_KEY}:query`
            },
            {
                source : "/api/movies/search/company/:query",
                destination : `https://api.themoviedb.org/3/search/company?api_key=${API_KEY}:query`
            },
            {
                source : "/api/movies/search/person/:query",
                destination : `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}:query`
            }

        ]
    } 
}

module.exports = nextConfig;