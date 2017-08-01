/**
 * 获取验证码
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, TextInput, View,} from 'react-native';
import Touchable from 'react-native-touchable'

const Status = {
    Normal: 1,  //正常状态
    Start: 2,    //倒计时开始状态
    End: 3,//倒计时结束
}

export default class VerifyCode extends Component {

    static propTypes = {
        ...TextInput.props,
        containerStyle: View.propTypes.style,
        textInputStyle: TextInput.propTypes.style,

        countdownNormalStyle: View.propTypes.style,//倒计时正常状态下样式
        countdownStartStyle: View.propTypes.style,//倒计时开始状态下样式
        countdownEndStyle: View.propTypes.style,//倒计时结束状态下样式

        countdownNormalTextStyle: View.propTypes.style,//倒计时正常状态下字体样式
        countdownStartTextStyle: View.propTypes.style,//倒计时开始状态下字体样式
        countdownEndTextStyle: View.propTypes.style,//倒计时结束状态下字体样式

        maxTime: PropTypes.number, //最大时长，默认60秒
        normalTxt: PropTypes.string,//未开始倒计时的文案
        countdownTxt:PropTypes.string,//倒计时秒数后面的文案
        endTxt: PropTypes.string,//倒计时结束文案
        auto: PropTypes.boolean,//是否自动开始倒计时，默认false

        beforeCountdown:PropTypes.func,//开始倒计时前回调，需要返回boolean值，true：开始倒计时，false：不开始倒计时，这里可以做一些验证，比如手机号的验证
        startCountdown: PropTypes.func,//倒计时的回调,
        onValueChange: PropTypes.func,//输入框值变化时的回调

    }

    static defaultProps = {
        maxTime: 60,
        normalTxt: '发送验证码',
        endTxt: '重新发送',
        countdownTxt:'秒后重新发送',
        auto: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            countdownTxt: props.normalTxt,
        };
    }

    componentDidMount() {
        if(this.props.auto){
            this.startCountdown();
        }
    }

    status = Status.Normal;
    //点击开始
    startCountdown = () => {
        if (this.status != Status.Start) {
            if (this.props.beforeCountdown) {
                var flag = this.props.beforeCountdown();
                if (flag) {
                    this._startTimer();
                }
            }else{
                this._startTimer();
            }
        }
    }

    countdownTime = 0;//倒计时时间
    _startTimer = () => {
        const {maxTime, endTxt,countdownTxt,startCountdown} = this.props;
        if(startCountdown){
            startCountdown();
        }

        this.countdownTime = maxTime ; //倒计时时间
        this.status = Status.Start;
        this.setState({
            countdownTxt:maxTime+countdownTxt,
        });
        this.timer = setInterval(() => {
            var currTime = this.countdownTime - 1;
            if (currTime <= 0) {
                this.countdownTime = maxTime;
                this.status = Status.End;
                this.setState({
                    countdownTxt:endTxt,
                });
                clearInterval(this.timer);
            } else {
                this.countdownTime = currTime;
                if (this.countdownTime == maxTime) {
                    this.setState({
                        countdownTxt:this.countdownTime+countdownTxt,
                    });
                } else {
                    this.setState({
                        countdownTxt:this.countdownTime+countdownTxt,
                    });
                }
            }
        }, 1000);
    }

    getTouchableStyle = () => {
        var style = {};
        switch (this.status) {
            case Status.Start:
                style = [styles.touchable, this.props.countdownStartStyle];
                break;
            case Status.End:
                style = [styles.touchable, this.props.countdownEndStyle];
                break;
            default:
                style = [styles.touchable, this.props.countdownNormalStyle];
        }
        return style;
    }

    getTouchableTextStyle = () => {
        var style = {};
        switch (this.status) {
            case Status.Start:
                style = [styles.touchableText, this.props.countdownStartTextStyle];
                break;
            case Status.End:
                style = [styles.touchableText, this.props.countdownEndTextStyle];
                break;
            default:
                style = [styles.touchableText, this.props.countdownNormalTextStyle];
        }
        return style;
    }

    render() {
        var props = Object.assign({}, this.props);
        props.containerStyle = [styles.container, props.containerStyle];
        props.textInputStyle = [styles.textInput, props.textInputStyle];
        props.touchableStyle = this.getTouchableStyle();
        props.touchableTextStyle = this.getTouchableTextStyle();

        return (
            <View style={props.containerStyle}>
                <TextInput style={props.textInputStyle}
                           underlineColorAndroid='transparent'
                           {...props}
                           onChangeText={(text) => {
                               if (props.onValueChange) {
                                   props.onValueChange(text);
                               }
                           }}/>
                <Touchable
                    style={props.touchableStyle}
                    onPress={this.startCountdown}>
                    <Text style={props.touchableTextStyle}>{this.state.countdownTxt}</Text>
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    textInput: {
        flex: 1,
        backgroundColor: 'white',
        fontSize: 15,
        paddingLeft: 12
    },
    touchable: {
        width: 128,
        marginLeft: 24,
        backgroundColor: '#161616',
    },
    touchableText: {
        color: 'white',
    }
})
