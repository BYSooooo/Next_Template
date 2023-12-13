import { Timestamp } from "firebase/firestore"

interface UserInfo {
    displayName : string,
    email : string,
    emailVerified : boolean,
    photoURL : string,
    uid : string   

}
/**
 * @property from : User Who sent the friend request.
 * @property to : User who received a friend request.
 * @property req_date : The time the request was sent
 * @property status : The status of the current request
 * @property checkYn : Whether the user who received the request has been verified.
 */
interface RequestFriend {
    from : string,
    to : string,
    req_date : Timestamp,
    status : "request" | "success" | "refusal",
    checkYn : boolean

}