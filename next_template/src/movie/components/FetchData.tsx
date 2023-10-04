/** Fetching TMDB - Popular Movie List 20 */
export async function getPopular() {
    try {
        const response = await (await fetch('/api/movies/popular')).json();
        return response.results;
    } catch (err) {
        throw new Error('Failed to Fetch Movie_Popular')
    }

}
/** Fetching TMDB - Movie Genre List */
export async function getGenre() {
    try {
        const response = await (await fetch ('/api/movies/genreList')).json();
        return response.genres
    } catch (err) {
        throw new Error('Failed to Fetch Movie_GenreList')
    }
}

/** Fetching TMDB - Movie Search by Fitering */
export async function search(query: string) {
    console.log(`search : ${query}`)
    try {
        const response = await (await fetch (`/api/movies/search/${query}`)).json();
        console.log(`Fetch Response : ${response}`)
        return response
    } catch(err) {
        console.log(err)
        throw new Error('Failed to Fetch Movie_search')
    }
}

/** Fetching TMDB - get Movie Detail by movieId */
export async function getDetail(query: string) {
    console.log("getDetail id : " + query)
    try {
        const response = await (await fetch(`/api/movies/detail/${query}`)).json()
        return response
    } catch(err) {
        console.log(err);
        throw new Error('Failed to Fetch Movie_getDetail')
    }
}

/** Fetching TMDB - get Collcetion Detail by Collection ID */
export async function getCollection(query : string) {
    console.log("getColId : " + query)
    try {
        const response = await ( await fetch(`/api/movies/collection/${query}`)).json()
        return response;
    } catch(err) {
        console.log(err);
        throw new Error('Failed to Fetch Movie_getCollection')
    }
}
/** Fetching TMDB - get Cast Info by Cast ID */
export async function getCastInfo(query : string) {
    console.log(`Cast ID : ${query}`);
    try {
        const response = await ( await fetch(`/api/movies/cast/${query}`)).json();
        return response;
    } catch (err) {
        console.log(err);
        throw new Error('Failed to Fetch Movie_getCastInfo')
    }
    
}

/** Fetching TMDB - get Company Detail Info by Company ID */
export async function getCompanyDetail(query : string) {
    console.log(`Company ID : ${query}`);
    try {
        const response = await ( await fetch(`/api/movies/company/${query}`)).json();
        return response;
    } catch (err) {
        console.log(err);
        throw new Error('Failed to Fetch Movie_getCompnayDetail');
    }
}