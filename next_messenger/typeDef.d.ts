import { Timestamp } from "firebase/firestore"

type UserInfo = {
    uid : string,
    email : string,
    emailVerified : string,
    displayName : string,
    avatarImg : string
    avatarOpenYn : boolean,
    profileImg : string,
    profileImgOpenYn : boolean,
    requested : [string],
    received : [string],
    friend : [{uuid : string, chatId : string}]
}

type friendRequestInfo = {
    from : string,
    to : string,
    date : string,
    status : string,
}

type Chat = {
    member : string[],
    messages : ChatMessage[]
};

type ChatMessage = {
    docId : string,
    content : string,
    createdAt : Date | string,
    createdBy : string,
    attachYn : boolean,
    attachFile : string,
    deleteYn : boolean
}