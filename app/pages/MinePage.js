/**
 * Created by osx on 2017/10/10.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    SrollView,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import {getNavigator} from '../router/navigatorComponent';

import * as LoginPage from './LoginPage';
import connectComponent from '../reduxConnect/connectComponent';
const Login =connectComponent(LoginPage);
import {login} from '../axiosApi/loginApi'
import DB,{key} from '../common/db';

class Mine extends Component{
    constructor(props){
        super(props);
        this.state={
            sessionId:''
        }
    }

    /**
     * redux test
     */
    // login(){
    //     const {actions} = this.props;
    //     /*修改为当前的用户*/
    //     let temp={
    //         username:'智能ABC'
    //     };
    //     actions.modifyUserName(temp);
    // }
    /**
     * router test
     */

    _login(){
        getNavigator().push({
            component:Login,
            props:{...this.props},
            params:{}
        });
    }

    loginTest(){
        console.log("正在尝试登陆");
        /*使用restfulApi进行后台的可以屏蔽*/
        let temp={
            "code": "111",
            "username": "110110"
        };
        login(temp).then(res => {
            console.log(res.data.sessionId);
            console.log(res.status);
            //存入
            DB.saveById(key.ACCOUNT,"sessionId",{
                sessionId:res.data.sessionId
            },1000*3600*24*30);
            //调用
            DB.loadById(key.ACCOUNT, "sessionId",(ret)=> {
                this.setState({sessionId:ret.sessionId});
                }, (error)=> {
                console.log(error);
                }
            );
        }).catch(error => {
            console.log(error)
        });
    }

    render(){
        const {userReducer}=this.props;
        return(
           <View style={styles.container}>
               <Text>
                   这是{userReducer.username}的页面
               </Text>
               <Text>
                   这是用户密码：{userReducer.password}
               </Text>
               <View>
                   <TouchableHighlight onPress={this._login.bind(this)} >
                       <View>
                           <Text>
                           登录
                           </Text>
                       </View>
                   </TouchableHighlight>
               </View>
               <View>
                   <TouchableHighlight onPress={this.loginTest.bind(this)} >
                       <View>
                           <Text>
                               测试本地api
                           </Text>
                       </View>
                   </TouchableHighlight>
               </View>
               <Text>
                   sessionId：{this.state.sessionId}
               </Text>
           </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
});

export const LayoutComponent=Mine;
export function mapStateToProps(state) {
    return{
        userReducer:state.userReducer,
    }
}

