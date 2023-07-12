import Chip from '@mui/material/Chip';

export default function GenreBtn() {

    const delFunction = () => {
        
    }
    
    return (
        <Chip label="text" sx={{ marginInline : "0.5rem"}} onDelete={delFunction}/>
    )
}