/**
 * Created by 孟庆东 on 2017/7/28.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Alert,
} from 'react-native';

import VerifyCode from './VerifyCode'

export default class VerifyCodeDemo extends Component {

    beforeCountdown = ()=>{
        //需要返回boolean值，true：开始倒计时，false：不开始倒计时，这里可以做一些验证，比如手机号的验证
        return true;
    }

    startCountdown = ()=>{
        Alert.alert('startCountdown');
    }

    onValueChange = (text)=>{
        Alert.alert(text);
    }

    render() {
        return (
            <View style={{flex: 1,paddingTop:30,paddingRight:20,paddingLeft:20}}>
                <VerifyCode
                    placeholder='请输入验证码'
                    placeholderTextColor='gray'
                    countdownNormalStyle={styles.countdownNormalStyle}
                    countdownStartStyle={styles.countdownStartStyle}
                    countdownEndStyle={styles.countdownEndStyle}
                    countdownNormalTextStyle={styles.countdownNormalTextStyle}
                    countdownStartTextStyle={styles.countdownStartTextStyle}
                    countdownEndTextStyle={styles.countdownEndTextStyle}
                    maxTime={10}
                    normalTxt='发送'
                    countdownTxt='秒后发送'
                    endTxt='再发一次哦'
                    auto={false}
                    beforeCountdown={this.beforeCountdown}
                    startCountdown={this.startCountdown}
                    onValueChange={this.onValueChange}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    countdownNormalStyle:{
        backgroundColor:'blue',
    },
    countdownStartStyle:{
        backgroundColor:'yellow',
    },
    countdownEndStyle:{
        backgroundColor:'red',
    },
    countdownNormalTextStyle:{
        color:'black',
    },
    countdownStartTextStyle:{
        color:'blue',
    },
    countdownEndTextStyle:{
        color:'gray',
    },
})