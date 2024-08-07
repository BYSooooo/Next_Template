type movieOverview = {
    adult           : boolean;
    backdrop_path   : string;
    genre_ids       : number[];
    id              : number;
    original_language : string;
    original_title  : string;    
    overview        : string;
    popularity      : number;
    poster_path     : string;
    release_date    : string;
    title           : string;
    video           : boolean;
    vote_average    : number;
    voe_count       : number;   
}

type genre = {
    id : number;
    name : string;
}