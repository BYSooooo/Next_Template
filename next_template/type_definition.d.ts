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

interface MovieDetail {
    adult : boolean, 
    backdrop_path : string,
    belongs_to_collection : {
        id : number,
        name : string,
        poster_path : string,
        backdrop_path : string
    }
    budget : number,
    genres : [
        {id : number, name : string}
    ],
    homepage : string,
    id : number,
    imdb_id : string,
    original_language : string,
    original_title : string,
    overview : string,
    popularity : number,
    poster_path : string,
    production_companies : [
        {id : number, logo_path : string, name : string, origin_country : string}
    ],
    production_countries : 
        [{ iso_3166_1 : string, name : string}],
    release_date : string,
    revenue : number,
    runtime : number,
    spoken_languages : [
     {  english_name : string, 
        iso_639_1 : string,
        name : string}   
    ]
    status : string,
    tagline : string,
    title : string,
    video : boolean,
    vote_average : number,
    vote_count : number,
    credits : CreditInfo,
    videos : { results : VideoInfo[] },
    images : ImageInfo

}

interface CreditInfo {
    cast : CastInfo[],
    crew : CrewInfo[]
}

interface CastInfo {
    adult : boolean, cast_id : number, character : string, credit_id : string,
    gender : number, id : number, known_for_department : string, name : string,
    order : number, original_name : string, popularity : number, profile_path : string
}
interface CrewInfo {
    adult : boolean, credit_id : string, department : string, gender : number,
    id : number, job : string, known_for_department : string, name : string,
    original_name : string, popularity : number, pofile_path : string
}

interface VideoInfo {
    id : string,
    iso_3166_1 : string,
    iso_639_1 : string,
    key : string,
    name : string,
    offical : boolean,
    published_at : string,
    site : string,
    size : number,
    type : string
}

interface ImageInfo {
    backdrops: ImageType[],
    logos : ImageType[], 
    posters : ImageType[]
}

interface ImageType {
    file_path : string, 
    width : number, 
    height : number,
    iso_639_1 : string
}

interface CollectionInfo {
    backdrop_path : string,
    id : number,
    name : string,
    overview : string,
    parts : MovieInfo[],
    poster_path : string
}