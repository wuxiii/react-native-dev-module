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
} from 'react-native';

class Mine extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
           <View style={styles.container}>
               <Text>
                   这是我的页面
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

module.exports=Mine;

