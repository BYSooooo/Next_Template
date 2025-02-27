type UserInfo = {
    email : string,
    emailVerified : string,
    displayName : string,
    avatarImg : string
    avatarOpenYn : boolean
    requested : [string],
    received : [string]
}

type friendRequestInfo = {
    from : string,
    to : string,
    date : string,
    status : string,
}