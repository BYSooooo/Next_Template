import { useAppSelector } from "@/redux/hook"
import { Chip } from "@mui/material";


export default function GenreBox({genre} : {genre : number}) {
    const genreList : MovieGenreInfo[] = useAppSelector((state) => state.movieGenre);

    const {id, name} = genreList.find((genres) => genres.id === genre)
    return (
        <Chip key={id} label={name} color="primary" variant="outlined"/>
        
    )
        
        
    
}