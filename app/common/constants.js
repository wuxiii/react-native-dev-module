/**
 * Created by osx on 2017/10/10.
 */
import {Dimensions} from 'react-native';
let window={
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
}

export default {
    window:window,
}