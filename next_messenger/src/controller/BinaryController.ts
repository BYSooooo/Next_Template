export function binaryEncode(file: File) {
    const reader = new FileReader();
    
    return new Promise((resolve,reject)=> {
        reader.onload = ()=> {
            resolve(reader.result);
        }
        reader.onerror = ()=> {
            reader.abort();
            reject()
        }
        reader.readAsDataURL(file)  
    })
}