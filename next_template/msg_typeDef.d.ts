import { FieldValue, Timestamp } from "firebase/firestore"
/**
 * @property dislayName : User Nickname
 * @property email : The email user used to sign up
 * @property emaiVerified : Users logged in through an external service
 * @property photoURL : User's Profile Photo
 * @property uid : Unique ID for User
 * @property friendList Unique UUID for User's Frined Relation
 * @property block : Other users who have blocked the current user
 * @property lastLogin : User's last loginned Time  
 */
interface UserInfo {
    displayName : string,
    email : string,
    emailVerified : boolean,
    photoURL : string,
    uid : string,
    friendList : Array<string>,
    block : {blockUser: string, blockDate:any}[],
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
  * View routing Interface
  */
 interface ViewRoute {
    title : string,
    left : string,
    middle : string,
    right : string
 }

/**
 * @property UUID : Individual IDs for Friendships
 * @property friendReqUUID : friendReq UUID 
 * @property friendEmail :  Emails from two users who are friends
 * @property acceptDate : Date the friendship was established
 * @property chatUUID : Unique value of a chat for two users
 */
interface FriendList {
    UUID : string,
    friendReqUUID : string,
    friendEmail : [string],
    acceptDate : Timestamp,
    chatUUID : string
}
/**
 * @property UUID : Unique number of Message (Auto increment must be applied)
 * @property message : Context of message
 * @property viewYn : Whether the other person has acknowledged current User's message
 * @property createDate : The date the message was created
 * @property attachedYn : Presence of attached files
 * @property attachedType : Type of attached file
 * @property attachedValue : Value of attached file (Google Cloud Storage URL)
 * @property author : Message author
 *  
 */
interface MessageInfo {
    UUID : string,
    message : string,
    viewYn : boolean
    createDate : Timestamp,
    attachedYn : boolean,
    attachedName : string | null,
    attachedType : string | null,
    attachedValue : any | null,
    author : string,
}

/**
 * Extend of MessageInfo for Selection for Attached File to Download
 * @prop selectedYn : Select Attachement
 */
interface AttachedInfo extends MessageInfo {
    selectedYn : boolean
}

/**
 * Interface of chatList in Firestore Cloud
 * 
 * @property uuid : Unique ID of chatList
 * @property friendListUUID : ID of Selected chat in 'friendList'
 * @property lastChat : last Date of Chat
 * @property active : Activation of chatRoom
 * @property disableRequest : Users who have applied to freeze a chat room
 * @property members : Member of participate in Chatting
 */
interface ChatRoomInfo {
    uuid : string,
    friendListUUID : string,
    lastChat : string,
    active : boolean,
    disableRequest? : string,
    members : string[]
}