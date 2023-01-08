import { get, post } from "./api.js";
import { clearUserData, setUserData } from "./util.js";



export async function register(email, username, password){
    const { objectId, sessionToken } = await post('/users', { email, username, password });

    const userData = {
        objectId,
        sessionToken,
        email,
        username
    }
    
    setUserData(userData);
}

export async function login(email, password){
    const {username, objectId, sessionToken } = await post('/login', {email, password});

    const userData = {
        objectId,
        sessionToken,
        email,
        username
    }

    setUserData(userData);
}

export async function logout(){
    //const result = get('/logout');
    clearUserData();
    //console.log(await result);
}