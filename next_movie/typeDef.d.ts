type MovieOverview = {
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

type Genre = {
    id      : number;
    name    : string;
}

type MovieDetail = {
    adult                   : boolean;
    backdrop_path           : string;
    belongs_to_collection   : Collection;
    budget                  : number;
    credits                 : { cast : Cast[], crew : Crew[]};
    genres                  : Genre[];
    homepage                : string;
    id                      : number;
    images                  : { backdrops : ImageInfo[],
                                logos     : ImageInfo[],
                                posters   : ImageInfo[] };
    imdb_id                 : string;
    origin_country          : string[];
    original_language       : string;
    original_title          : string;
    overview                : string;
    popularity              : number;
    poster_path             : string;
    production_companies    : CompanyInfo[];
    production_country      : { iso_3166_1 : string, name : string}[];
    release_date            : string;
    revenue                 : number;
    runtime                 : number;
    spoken_languages        : { english_name : string, iso_639_1 : string, name : string}[];
    status                  : string;
    tagline                 : string;
    title                   ; string;
    video                   : boolean;
    videos                  : {results? : VideoInfo[]};
    vote_average            : number;
    vote_count              : number;
}

type Collection = {
    backdrop_path   : string;
    id              : number;
    name            : string;
    poster_path     : string;
}

type Cast = {
    adult               : boolean;
    cast_id             : number;
    character           : string;
    credit_id           : string;
    gender              : number;
    id                  : number;
    known_for_department: string;
    name                : string;
    order               : number;
    original_name       : string;
    popularity          : number;
    profile_path        : string;
}

type Crew = {
    adult               : boolean;
    credit_id           : string;
    department          : string;
    gender              : number;
    id                  : number;
    job                 : string;
    known_for_department: string;
    name                : string;
    original_name       : string;
    popularity          : number;
    profile_path        : string;
}

type ImageInfo = {
    aspect_ratio        : number;
    file_path           : string;
    height              : number;
    iso_639_1           : string;
    vote_average        : number;
    vote_count          : number;
    width               : number;
}

type CompanyInfo = {
    id              : number;
    logo_path       : string;
    name            : string;
    origin_country  : string;
}

type VideoInfo = {
    id          : string;
    iso_3166_1  : string;
    iso_639_1   : string;
    key         : string;
    name        : string;
    official    : boolean;
    published_at: string;
    site        : string;
    size        : number;
    type        : string;
}

type PersonInfo = {
    adult : boolean,
    also_known_as : string[],
    biography : string,
    birthday : string,
    combined_credits : {
        cast : MovieDetail[],
        crew : MovieDetail[]
    },
    deathday : string | null,
    gender : number,
    homepage : string | null,
    id : number,
    imdb_id : string,
    known_for_department : string,
    name : string,
    place_of_birth : string,
    popularity : number,
    profile_path : string
}