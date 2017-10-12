/**
 * Created by osx on 2017/10/12.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TouchableWithoutFeedback,
    Platform
} from 'react-native' ;
import {getNavigator} from '../router/navigatorComponent';
import constants from '../common/constants';

class Login extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableHighlight onPress={getNavigator().pop} underlayColor={'rgb（255,80,120）'} >
                        <Text style={styles.text}>后退</Text>
                    </TouchableHighlight>
                </View>
                <View>

                </View>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(227,52,83)'
    },
    header:{
        marginTop:(Platform.OS === 'ios')?16:3,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'rgb(227,0,0)'
    },
    text:{
        fontSize:constants.window.width*0.03,
    }

});

export const LayoutComponent=Login;
export function mapStateToProps(state) {
    return{}
}
