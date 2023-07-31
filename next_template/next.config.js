/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY

const nextConfig = {
    reactStrictMode: false,
    swcMinify : true,
    modularizeImports : {
        '@mui/icons-material' : {
            transform : '@mui/icons-material/{{member}}',
        }
    },
    async rewrites() {
        return [
            {
                source : "/api/movies/popular",
                destination : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
            },
            {
                source : "/api/movies/genreList",
                destination : `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
            },
            {
                source : "/api/movies/search/query/:query",
                destination : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=:query`
            }
        ]
    }
}

module.exports = nextConfig
