import axios from 'axios';
let axiosConnect = {
    baseConfig:{
        baseURL: 'http://localhost:4000',
        responseType: 'json',
        headers: {'Content-Type':'application/json'},
        withCredentials: false
    },
    set setConfig(newConfig){
        if(Object.keys(newConfig).length !== 0){
            for(let key in newConfig){
                this.baseConfig[key] = newConfig[key];
            }
        }
    },
    get getConnection(){
        return axios.create(this.baseConfig);
    }
};

export default  axiosConnect;