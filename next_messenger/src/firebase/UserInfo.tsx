// Firebase Function of User Information 

export async function initUserInfo() {
    if(userAuth.currentUser) {
        const docInfoRef = doc(firebaseStore, 'userInfo', userAuth.currentUser.uid);
        const docImgRef = doc(firebaseStore, 'avatarImg', userAuth.currentUser.uid);
        const docProfileImgRef = doc(firebaseStore, 'profileImg', userAuth.currentUser.uid);
        try {
            const currentDoc = await getDoc(docInfoRef)
            // Check Y/N current User's Info in  firestore base 'userInfo' Collection
            if(currentDoc.data()) {
                return { result : true, content : currentDoc.data()}
            } else {
                await setDoc(docInfoRef, {
                    uid : userAuth.currentUser.uid,
                    email : userAuth.currentUser.email,
                    emailVerified : userAuth.currentUser.emailVerified,
                    displayName : userAuth.currentUser.displayName,
                    requested : [],
                    received : [],
                    friend : []
                }, { merge : true })
                await setDoc(docImgRef, {
                    uid : userAuth.currentUser.uid,
                    email : userAuth.currentUser.email,
                    avatarImg : "",
                    avatarOpenYn : false
                }, { merge : true })
                await setDoc(docProfileImgRef, {
                    uid : userAuth.currentUser.uid,
                    email : userAuth.currentUser.email,
                    profileImg : "",
                    profileImgOpenYn : false
                }, { merge : true})
                return { result : true, content : ""};
            }

        } catch(error) {
            return { result : false, content : error}
        }
    }
}