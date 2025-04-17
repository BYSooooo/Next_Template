type UserInfo = {
    uid : string,
    email : string,
    emailVerified : string,
    displayName : string,
    avatarImg : string
    avatarOpenYn : boolean
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