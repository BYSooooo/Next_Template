import Toggle from '../component/header/Toggle';
import HomeButton from '../component/header/HomeButton';
import LogoutButton from '../component/header/LogoutButton';

export default function Header() {    
    return (
        <header className='
            flex fixed w-full
            bg-blue-600 dark:bg-gray-700 
            h-12
            px-7
            items-center
            justify-between'>
            <HomeButton />
            <div className='flex'>
                <Toggle />
                <LogoutButton />
            </div>
        </header>
    )
}