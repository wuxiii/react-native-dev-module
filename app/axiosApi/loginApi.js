/**
 * Created by osx on 2017/10/14.
 */
import config from '../common/configuration';
import axios from 'axios';

let base=config.host;
let loginApi=axios.create({
    baseURL: base,
    timeout: 5000,
    headers:{'Content-Type':'application/json;charset=UTF-8'}
});

loginApi.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    return config;
},(error) =>{
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
loginApi.interceptors.response.use((res) =>{
    //对响应数据做些事
    if(res.status>404){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

export const login=(params)=>{
    return loginApi.post(`${base}/user/login`,params);
}