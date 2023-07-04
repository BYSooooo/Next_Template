import { useAppSelector } from "@/redux/hook"
import { Button } from "@mui/material";

export default function GenreBox({genre} : {genre : number}) {
    const genreList : MovieGenreInfo[] = useAppSelector((state) => state.movieGenre);
    const {id, name} = genreList.find((genres) => genres.id === genre)
        
    return (
        <Button size="small" color="info" variant="outlined">
            {name}
        </Button>
    )
        
        
    
}