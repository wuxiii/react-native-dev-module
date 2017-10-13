/**
 * Created by osx on 2017/10/13.
 */
import {
    Text,
} from 'react-native';
import {cloneElement} from 'react';
import _ from 'lodash';

function initPrototype(){
    Text.prototype.render = _.wrap(Text.prototype.render, function (func, ...args) {
        let originText = func.apply(this, args);
        return cloneElement(originText, {
            allowFontScaling:false,  //TODO 控制字体是否要根据系统的“字体大小”辅助选项来进行缩放。
            style: [
                originText.props.style,
                {
                    fontFamily: 'PingFangSC-Regular'  //统一为苹方字体
                }
            ]
        });
    });
}
export default initPrototype;