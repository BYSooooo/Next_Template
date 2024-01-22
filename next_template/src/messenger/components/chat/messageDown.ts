import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver'
import { AttachedInfo } from '../../../../msg_typeDef';

export function messageDown(data : BlobPart, fileName:string, fileType : string) {
    const blob = new Blob([data], {type : fileType})

    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
        view : window,
        bubbles : true,
        cancelable : true
    });
    a.dispatchEvent(clickEvt);
    a.remove()
}

export function attachedDown(attachArray: AttachedInfo[]) {
    let zip = new JSZip();
    const folder = zip.folder('Attachement');
    attachArray.map((attached)=> {
        const blob = fetch(attached.attachedValue).then(res=> res.blob())
        folder.file(attached.attachedName, blob)
    })
    zip.generateAsync({type : 'blob'}).then((blob)=>{
        saveAs(blob,'test.zip')
    } )

}