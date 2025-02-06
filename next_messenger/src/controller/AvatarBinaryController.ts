export function binaryEncode(file: File) {
    console.log("Encode Called")
    
    const reader = new FileReader();

    reader.onload = function(event:any) {
        const arrayBuffer = event.target.result;
        const binaryData = new Uint8Array(arrayBuffer)

        let binaryString = '';
        binaryData.forEach(byte=> {
            binaryString += byte.toString(2).padStart(8,'0') + ' ';
        })
        console.log(binaryString)
    }
    reader.readAsArrayBuffer(file)
    
}