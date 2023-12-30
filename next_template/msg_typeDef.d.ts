import { Timestamp } from "firebase/firestore"
/**
 * @property dislayName : User Nickname
 * @property email : The email user used to sign up
 * @property emaiVerified : Users logged in through an external service
 * @property photoURL : User's Profile Photo
 * @property uid : Unique ID for User
 * @property friendList Unique UUID for User's Frined Relation
 * @property lastLogin : User's last loginned Time  
 */
interface UserInfo {
    displayName : string,
    email : string,
    emailVerified : boolean,
    photoURL : string,
    uid : string,
    friendList : Array<string>,
    lastLogin : string,
    introduction : string
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