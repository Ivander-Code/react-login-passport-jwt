import axiosConnect from "../helpers/axiosConnect";

let authService = async (data, route)=>{
    const connection = axiosConnect.getConnection;
    let response     = {};
    try{
        response = await connection.post(route,data);
    }catch(error){
        response = error.response;
    }
    createSession(response.data.token, response.data.isAuthenticated, response.data.userDetail);
    return response;
};

export let singup = async(data)=>{
    return await authService(data, '/api/auth/singup');
};

export let singin = async(data)=>{
    return await authService(data, '/api/auth/singin');
};

let createSession = (...[token, isAuthenticated, userDetail])=>{
    destroySession();
    localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('userDetail', JSON.stringify(userDetail));

};

let destroySession = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userDetail');
};

export let logout = async()=>{
    destroySession();
};

export let verifySession = async()=>{
    let token = getSessionItem('token');
    let response ={};
    if(token){
        axiosConnect.setConfig = {
            headers:{
                'Authorization':token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        let connection = axiosConnect.getConnection;
        try{
            response = await connection.post('/api/auth/verifySession');
        }catch(error){
            response = error.response;
        }

        (response.status !== 200)? destroySession():
            createSession(response.data.token, response.data.isAuthenticated, response.data.userDetail);
    }else{
        logout();
    }
};

export let getSessionItem = (key)=>{
    return localStorage.getItem(key);
};
