export default function EditPohtoUrl({photoUrl} : {photoUrl : string}) {
    return (
        <div>
            {photoUrl 
                ? <p>
                    Yes
                </p>
                : <p>
                    No
                </p>
            }
        </div>
    )
}