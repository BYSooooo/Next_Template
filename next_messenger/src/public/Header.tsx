import Toggle from '../component/Toggle';
import HomeButton from '../component/HomeButton';

export default function Header() {    
    return (
        <header className='
            flex absolute w-full
            bg-blue-600 dark:bg-gray-700 
            h-12
            px-7
            items-center
            justify-between'>
            <HomeButton />
            <Toggle />
        </header>
    )
}