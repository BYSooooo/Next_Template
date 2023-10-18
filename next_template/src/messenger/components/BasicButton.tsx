export default function MainButton({context, onClicked} : {context : string, onClicked : Function}) {
    
    const buttonHandler = (event : React.MouseEvent<HTMLButtonElement>)=> {
        event.preventDefault();
        onClicked()
    }

    
    return (
        <button 
            type="button"
            className='block bg-blue-400 dark:bg-blue-200 rounded-md px-3 py-2 mx-1'
            onClick={buttonHandler}>
            {context}
        </button>
    )
    
}