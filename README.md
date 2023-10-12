# Next_Template
This is a personal project based on Reactjs and Nextjs.<br>
Project internal services will be added on an ongoing basis.<br>
Please refer to the link below for development records and details
### Link
Deploy : [Vercel](https://next-template-alpha-ten.vercel.app) <br>
Blog : [Notion](https://nervous-piper-af7.notion.site/39217964f90746028a396f2829fed6a2?v=ee8667e0578548e4b05ed1fbe4af0bd8&p=631cae7ca1084844b5405a4bc3230baf&pm=c)
### Version
- 0.1.0 - Develop and Deploy 'MoviePage'
> You can use the TMDB API to search and view movie information.
>> Search - Search by title through filtering according to release year and adult content <br>
>> Popular - Based on the TMDB API, you can display a list of the current popular movies and view simple information <br>
>> Detail _ You can view the details of the selected movies in the search and popular movie list. <br>
>> - Display the filmmaker or actor and select them to view the details <br>
>> - View videos and images related to the selected movie <br>
>> - If there is Collection information, display the list and go to the movie's details when selected.
## Component Map
<details>
    <summary>View Map(In Making...)</summary>
```mermaid
---
title : Component Map
---
flowchart TB
    home(Home)
    subgraph Movie
        direction TB
        subgraph MovieMain
            direction LR
            mainsearch(MainSearch)
            popularlist(PopularList)
        end
        subgraph SearchFilter
            sf_year(YearFilter)
            sf_adult(AdultFilter)
            sf_keyword(Keyword)
        end
        subgraph SearchMain
            sm_list(SearchList) --->|Select One|sm_card(MovieCard) --->|Select|sm_overview(MovieOverview)
        end
        subgraph DetailMain
            dm_detail(DetailMain)
            dm_company(DetailCompanyList)
            dm_credits(DetailCaompanyCredits)
        end
    end
    subgraph TMDB_API
        direction TB
        f_popular(Fetch_Popular)
        f_search(Fetch_List)
        f_detail(Fetch_Detail)
    end
    subgraph SessionStroage
        s_query(Query)
    end
    subgraph Redux
        direction LR
        r_popular[popular_Store]
        r_search[searchFilter_Store]
        r_result[searchResult_Store]
        r_detail[movieDetail_Store]
    end
home -->|Select|Movie
home -->|Disabled|Messenger
Movie ---|Auto_Fetch|f_popular ---|Save Result|r_popular ---|View List|popularlist
mainsearch -->|Select Filter|SearchFilter --- |Save|r_search ---|Save|s_query
s_query ---|Fetch|f_search ---|Save|r_result ---|View List|sm_list
sm_overview -->|View Detail|dm_detail
```
</details>
