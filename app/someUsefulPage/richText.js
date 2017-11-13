/**
 @description: 图文混搭编辑
 @date: 2017/11/9
 @author: KevinChan(417274186@qq.com)
 */
import React, { Component } from 'react'

import {
    TextInput,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native'
/**
 * 组件引用的目录全不正确，如需引用请联系
 */
import {connect} from 'react-redux'
import {Text} from '../../components/AppText'
import {OSS_CRYPTO} from '../../constants/FetchUrls'
import ImagePicker from 'react-native-image-crop-picker'
import AppHeaderWithBack from '../../components/AppHeaderWithBack'
import * as StyleSheet from '../../components/AppStyleSheet'
import KeyboardSpacer from '../../components/KeyboardSpacer'
import OptionsDot from '../../components/OptionsDot'

import {windowWidth,R_alert,R_GET} from "../../utils/index"
import {pageBackgroundColor,appScale} from '../../constants/Colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: pageBackgroundColor
    },
    scrollView: {}
});

//统计当前组件数的变量
let componentCount=0;
//定位当前本插入图片的组件的索引
let componentLocateIndex=0;
//定位当前插入图片的组件的光标所在位置
let componentLocateSelected=0;
class AppCircleActivityContentEditView extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"",
            componentIndex:[0],
            componentContents:[{
                imageUrl:'',
                value:'',
                height:50,
                resize:1,
            }],
        };
        this.closeView = this.closeView.bind(this)
    }

    closeView() {
        this.props.navigator.pop()
    }

    // //定位focus数据
    // onSelectLocate(event,index){
    //     // console.log(`${index}  `)
    //     componentLocateIndex=index;
    //     // console.dir(event.nativeEvent.selection.end);
    //     componentLocateSelected=event.nativeEvent.selection.end;
    // }

    //添加图片时，新增组件内容
    addComponent(imageUrl,resize) {
        if(imageUrl){
            let tempContent={
                imageUrl:imageUrl?imageUrl:'',
                value:"",
                height:30,
                resize:resize?resize:1,
            };
            let tempIndex=this.state.componentIndex;
            tempIndex.push(++componentCount);
            let tempState=this.state.componentContents;
            tempState.push(tempContent);
            //如果连续插入两张图片，则把上个item的textInput的高度设置为极小值
            if(tempIndex.length-2>=0){
                if(tempState[tempIndex[tempIndex.length-2]].value==''){
                    if(tempIndex[tempIndex.length-2]==0){
                        tempState[0].height=25
                    }else{
                        tempState[tempIndex[tempIndex.length-2]].height=10
                    }
                }
            }
            this.setState({
                componentContents:tempState,
                componentIndex:tempIndex
            });
        }
    }

    //关闭图片
    closeImage(event,index){
        if(index){
            let tempIndex=this.state.componentIndex;
            let tempContents=this.state.componentContents;
            //在删除元素的时候先吧数据复制到上个组件中
            if(tempIndex.findIndex(item => item=== index)>0) {
                tempContents[tempIndex[tempIndex.findIndex(item => item=== index)-1]].value+='\n'+tempContents[tempIndex[tempIndex.findIndex(item => item=== index)]].value;
                tempContents[tempIndex[tempIndex.findIndex(item => item=== index)-1]].height+=tempContents[tempIndex[tempIndex.findIndex(item => item=== index)]].height;
                tempIndex.splice(tempIndex.findIndex(item => item === index), 1);
            }
            // console.log(tempIndex);
            // console.log(tempContents);
            this.setState({
                componentContents:tempContents,
                componentIndex:tempIndex
            });
        }
    }

    //遍历整个内容块索引
    renderList(list){
        return list.map(item => this.renderItem(item));
    }

    //根据内容块索引，展示每一个内容块中的内容
    renderItem(item) {
        return (
            <View key={item} style={{flex:1}}>
                {(()=>{
                    if(item>=1){
                        return(
                            <View style={{flex:1,width:windowWidth*0.95}}>
                                {(()=>{
                                    // console.log(item);
                                    if(this.state.componentContents[item].imageUrl){
                                        return(
                                            <View style={{marginTop:10,width:windowWidth*0.95}}>
                                                <Image
                                                    style={{width:windowWidth*0.95,height:windowWidth*0.95*this.state.componentContents[item].resize,backgroundColor:"#fff"}}
                                                    source={{uri:this.state.componentContents[item].imageUrl}}
                                                />
                                                <TouchableHighlight
                                                    underlayColor="#f0f0f0"
                                                    style={{width:25,height:25,position:"absolute",top:-7,right:-7}}
                                                    onPress={(e)=>{this.closeImage(e,item)}}
                                                >
                                                    <Image
                                                        style={{width:25,height:25}}
                                                        source={require("../../img/circle/close-picture@3x.png")}
                                                    />
                                                </TouchableHighlight>
                                            </View>)
                                    }
                                })()}
                                <TextInput
                                    autoCorrect={false}
                                    multiline={true}
                                    style={{fontSize:15,height:this.state.componentContents[item].height,lineHeight:30,fontFamily:'PingFang SC'}}
                                    value={this.state.componentContents[item].value}
                                    onChange={(event)=>this.onChange(event,item)}
                                    // onSelectionChange={(e)=>{this.onSelectLocate(e,item.key)}}
                                />
                            </View>)
                    }})()}
            </View>

        );
    }
    //输入框监测，修改内容和高度
    onChange(event,index) {
        // console.log(index);
        // console.log(event.nativeEvent);
        let temp = this.state.componentContents;

        if (event.nativeEvent.contentSize.height > 25) {//此处是判断 是否大于我设置的input默认高度，如果大于则使用input的内容高度
            temp[index].height = event.nativeEvent.contentSize.height;//内容高度
        }
        temp[index].value=event.nativeEvent.text;
        this.setState({
            componentContents:temp
        })
    }
    //图片上传(从utils/uploader中复制出来的,避免两次选择图片)
    getConfig() {
        return new Promise(function (resolve, reject) {
            R_GET(OSS_CRYPTO,{token:global.token,length:10000*10000},true).then((response)=> {
                if( response && response.error_code == "errors.nologin"){
                    reject("请重新登录")
                }else{
                    resolve(response)
                }
            }).catch((err)=> {
                reject(err)
            })
        })
    }
    //图片上传 (从utils/uploader中复制出来的,避免两次选择图片)
    uploadFile(path,type='image/jpeg',name='videoCover.jpg') {
        return new Promise((resolve, reject)=> {
            let source
            if (Platform.OS === 'android') {
                source = {uri: path, isStatic: true}
            } else {
                source = {uri: path.replace('file://', ''), isStatic: true}
            }
            let file={
                uri: source.uri,
                type,
                name,
            }
            this.getConfig().then((config)=> {
                var body = new FormData()
                body.append('name',name)
                body.append('key', 'res/' + config.filename)
                body.append('policy', config.policyBase64)
                body.append('OSSAccessKeyId', config.accessId)
                body.append('success_action_status', '200')
                body.append('callback', config.callback)
                body.append('signature', config.signature)
                body.append('file', file)

                fetch(config.host, {
                    method: 'POST',
                    body,
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            reject("服务器繁忙")
                        }
                    })
                    .then(function (response) {
                        resolve(JSON.parse(response.responseBody))
                    })
                    .catch(function (error) {
                        reject(error)
                    })
            }).catch(reject)
        })
    }
    //选择图片
    showImg(type){
        showImgPicker(type).then((response)=>{
            // console.log(response);
            let passImg = response
            if(type == "openCamera"){
                passImg = [{uri:response.uri,mime:response.type}]
            }
            this.uploadFile(passImg.uri).then((response)=>{
                console.log(response);
                if(response.filename&&response.height&&response.width){
                    this.addComponent(response.filename,response.height/response.width);
                }

            })

        }).catch((err)=>{
            R_alert(err)
        })
    }

    //发表文章
    publishArticle(){
        this.props.navigation.push()
    }

    render() {
        let botBoard
        if(Platform.OS == "ios"){
            botBoard = <KeyboardSpacer/>
        }
        let publishBtn
        if (true) {
            publishBtn = <TouchableOpacity style={[styles.publish_fixed_btn,{marginLeft:windowWidth*0.025}]} onPress={this.showPublish}>
                <OptionsDot
                    style={{paddingHorizontal:0}}
                    options={[
                        // {text: "拍照", onPress:this.showImg.bind(this, "openCamera")},
                        {text: "选择照片", onPress: this.showImg.bind(this, "openPicker")},
                    ]}
                    icon={require('../../img/circle/add-picture@3x.png')}
                    iconStyle={{width: 31 * appScale, height: 27 * appScale}}
                />
            </TouchableOpacity>
        }
        return (
            <View style={styles.container}>
                <AppHeaderWithBack
                    title="编辑活动介绍"
                    closeView={this.closeView}/>
                <ScrollView ref="scrollview">
                    <View style={{flex:1,flexDirection:"column",alignItems:"center"}}>
                        <TextInput
                            autoCorrect={false}
                            style={{height:50,fontSize:30,fontWeight:"bold",paddingLeft:windowWidth*0.025}}
                            value={this.state.title}
                            onChange={(title)=>{this.setState({title:title})}}//这里的title是个rn的event对象。。。。这是写的不对
                            placeholder="标题"
                        />
                        {/*<View style={{height:1,width:windowWidth*0.95,marginTop:-5,backgroundColor:"#000"}}/>*/}
                        <TextInput
                            autoCorrect={false}
                            multiline={true}
                            style={{minHeight:25,height:this.state.componentContents[0].height,fontSize:15,paddingLeft:windowWidth*0.025,fontFamily:'PingFang SC'}}
                            value={this.state.componentContents[0].value}
                            onChange={(event)=>this.onChange(event,0)}
                            placeholder="内容"
                            // onSelectionChange={(e)=>{this.onSelectLocate(e,0)}}
                        />
                        {this.renderList(this.state.componentIndex)}
                    </View>
                </ScrollView>
                <View style={{alignSelf:'flex-end',height:45,backgroundColor:"#f8f8f8",width:windowWidth}}>
                    <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
                        {publishBtn}
                    </View>
                </View>
                {botBoard}

            </View>
        )
    }
}

/*
* 拍照或者打开相册
*/
function showImgPicker(type){
    let default_options = {
        cropping: false,
        multiple:false,
        maxFiles:9,
        mediaType:'photo',
        compressImageMaxWidth:1080,
        compressImageMaxHeight:1920,
        compressImageQuality:0.8,
    }
    return new Promise(function (resolve,reject) {
        let resultOption={...default_options}
        if(true){
            delete resultOption.multiple //拍照方式不能多选
            delete resultOption.maxFiles //拍照方式不能多选
        }
        ImagePicker[type](resultOption).then((response) => {
            if (response.error) {
                reject(response.error)
            } else {
                let source= {uri: response.path, isStatic: true}
                if (Platform.OS === 'android') {
                    source = {uri: response.path, isStatic: true}
                } else {
                    source = {uri: response.path.replace('file://', ''), isStatic: true}
                }
                resolve({
                    uri: source.uri,
                    type: 'image/jpeg',
                    name: 'IMG_001.JPG',
                })
            }
        }).catch((err) =>{
            if(err.toString().includes('cancel')){
                return
            }
            reject(err)
        })

    })

}

function mapStateToProps(state) {
    return {
        navigation: state.navigation,
        userInfo:state.userInfo
    }
}

export default connect(mapStateToProps)(AppCircleActivityContentEditView)