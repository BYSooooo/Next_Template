import { useAppSelector } from "@/redux/hook";

export default function createQuery(searchFilter) {
    console.log(searchFilter)

    let year = "";
    let adult = "";
    let keyword = "";

    searchFilter.forEach(filter=> {
        if(filter.useFilter === true) {
            switch (filter.name) {
                case "year" : year = `&primary_release_year=${filter.value}`;
                    break;
                case "adult" : adult = `&inculde_adult=${filter.value}`;
                    break;
                case "keyword" : keyword = `&query=${filter.value.trim()}`
                    break;
                default : break;
            }
        } else {
            switch(filter.name) {
                case "year" : year = ""
                    break;
                case "adult" : adult = "";
                    break;
                case "keyword" : keyword = "";
                    break;
                default : break;   
            }
        }
    })

    return { yearQuery : year, adultQuery : adult, keywordQuery : keyword}
}