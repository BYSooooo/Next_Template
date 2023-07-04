interface movieInfo {
    adult : boolean,
    backdrop_path : string,
    gen_ids : [number],
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
    name : string
}
