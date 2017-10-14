/**
 * Created by osx on 2017/10/14.
 */
import config from '../common/configuration';
import axios from 'axios';
import db,{key} from '../common/db';

let usingApi=axios.create({
    baseURL: config.host,
    timeout: 5000,
    headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
});

usingApi.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    let sessionId='';
    DB.loadById(key.ACCOUNT, "sessionId",(ret)=> {
        sessionId=ret.sessionId;
        }, (error)=> {
            console.log(error);
        }
    );
    if(sessionId!=null&&sessionId!=''){
        config.headers.push['sessionId']=sessionId;
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
usingApi.interceptors.response.use((res) =>{
    //对响应数据做些事
    if(res.status>404){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});