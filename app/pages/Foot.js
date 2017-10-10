/**
 * Created by osx on 2017/10/10.
 */
import React,{Component,PropTypes} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import TabBar from '../components/tabBar/TabBar';
import Discover from './Discover';
import Ernie from './Ernie'
import Lucky from './Lucky'
import Mine from './Mine'

class Foot extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.container}>
                <TabBar
                    ref={(component=>this._tab = component)}
                    style={styles.content}
                    navTextColor="#8e8e8e"
                    navTextColorSelected={'#000000'}
                    onItemSelected={(index)=>{}}
                >

                    <TabBar.Item
                        icon={require('../image/footIcon/1_0.png')}
                        selectedIcon={require('../image/footIcon/1_1.png')}
                        title='摇奖'>
                        <Ernie {...this.props}>

                        </Ernie>
                    </TabBar.Item>

                    <TabBar.Item
                        icon={require('../image/footIcon/2_0.png')}
                        selectedIcon={require('../image/footIcon/2_1.png')}
                        title='喜得'>
                        <Lucky {...this.props}>

                        </Lucky>
                    </TabBar.Item>



                    <TabBar.Item
                        icon={require('../image/footIcon/3_0.png')}
                        selectedIcon={require('../image/footIcon/3_1.png')}
                        title='发现'>
                        <Discover {...this.props}>

                        </Discover>
                    </TabBar.Item>

                    <TabBar.Item
                        icon={require('../image/footIcon/4_0.png')}
                        selectedIcon={require('../image/footIcon/4_1.png')}
                        title='我'>
                        <Mine {...this.props}>

                        </Mine>
                    </TabBar.Item>
                </TabBar>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
});

module.exports=Foot;