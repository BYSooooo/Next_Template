import { Timestamp } from "firebase/firestore"

interface UserInfo {
    displayName : string,
    email : string,
    emailVerified : boolean,
    photoURL : string,
    uid : string,
    friendList : Array<string>   

}
/**
 * @property UUID : Unique ID for friend request.
 * @property from : User Who sent the friend request.
 * @property to : User who received a friend request.
 * @property req_date : The time the request was sent
 * @property status : The status of the current request
 * @property checkYn : Whether the user who received the request has been verified.
 */
interface RequestFriend {
    UUID : string,
    from : string,
    to : string,
    req_date : Timestamp,
    status : "request" | "success" | "refusal",
    checkYn : boolean

}
/**
 * @property UUID : Individual IDs for Friendships
 * @property friendEmail :  Emails from two users who are friends
 * @property acceptDate : Date the friendship was established
 * @property chatUUID : Unique value of a chat for two users
 */
interface FriendList {
    UUID : string,
    friendEmail : [string],
    acceptDate : Timestamp,
    chatUUID : string
}