/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY

const nextConfig = {
    i18n : {
        locales : ['en'],
        defaultLocale : 'en'
    },
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
                source : "/api/movies/search/:query",
                destination : `https://api.themoviedb.org/3/search/movie?/:query?api_key=${API_KEY}`
            },
            {
                source : "/api/movies/detail/:query",
                destination : `https://api.themoviedb.org/3/movie/:query?api_key=${API_KEY}&append_to_response=videos,images,credits`
            },
            {
                source : "/api/movies/collection/:query",
                destination : `https://api.themoviedb.org/3/collection/:query?api_key=${API_KEY}`
            },
            {
                source : "/api/movies/cast/:query",
                destination : `https://api.themoviedb.org/3/person/:query?api_key=${API_KEY}&append_to_response=combined_credits`
            },
            {
                source : "/api/movies/company/:query",
                destination : `https://api.themoviedb.org/3/company/:query?api_key=${API_KEY}`
            }
        ]
    }
}

module.exports = nextConfig
