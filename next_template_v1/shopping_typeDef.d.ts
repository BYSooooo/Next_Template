/**
 * User Information
 */
interface User {
    id : string,
    password : string,
    username : string,
    verified : boolean,
    address1 : string,
    address2 : string,
    
    
};

interface Entity extends User {};

class Entity {
    constructor ({id,password,username,verified,address1,address2} : User) {
        this.id = id;
        this.password = password;
        this.ussername = username;
        
    }
}

