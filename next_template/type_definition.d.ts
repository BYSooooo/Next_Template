interface MovieInfo {
    adult : boolean,
    backdrop_path : string,
    genre_ids : [number],
    id : number,
    original_language : string,
    original_title : string,
    overview : string,
    poster_path : string,
    release_date : string,
    video : boolean,
    vote_average : number,
    vote_count : number
}

interface MovieGenreInfo {
    id : number,
    name : string,
}

interface menuItem {
    path : string,
    text : string
}

interface SearchMovie {
    page : number,
    results : MovieInfo[],
    total_pages : number,
    total_results : number
}