import { Language } from "@mui/icons-material";
import { Box, Chip } from "@mui/material";

export default function LanguageList({langList} : {langList : { english_name : string, iso_639_1 : string, name : string}[]}) {
    return (
        <Box flexDirection={'column'}>
            {langList.map((language)=> {
                return (
                    <Chip 
                        key={language.iso_639_1}
                        size="small"
                        icon={<Language sx={{ fontSize : 'small'}}/>}
                        sx={{ my : 1}}
                        label={language.english_name}
                    />
                )
            })}
        </Box>
    )
}