# react-native-verify-code
顶部控件

项目中依赖了react-native-touchable（https://github.com/781238222/react-native-touchable）


使用：

1、在终端进入到项目目录：

    npm i react-native-touchable --save

    npm i react-native-header-bar --save

2、实例：

    import VerifyCode from 'react-native-header-bar'

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
                        maxTime={70}
                        normalTxt='发送'
                        countdownTxt='秒后发送'
                        endTxt='再发一次哦'
                        auto={true}
                        beforeCountdown={this.beforeCountdown}
                        startCountdown={this.startCountdown}
                        onValueChange={this.onValueChange}/>
                </View>
            );
        }


3、

    ...TextInput.props: 所有TextInput属性

    containerStyle: 容器样式

    textInputStyle: TextInput样式

    countdownNormalStyle: 倒计时正常状态下样式

    countdownStartStyle: 倒计时开始状态下样式

    countdownEndStyle: 倒计时结束状态下样式

    countdownNormalTextStyle: 倒计时正常状态下字体样式

    countdownStartTextStyle: 倒计时开始状态下字体样式

    countdownEndTextStyle:倒计时结束状态下字体样式

    maxTime: 最大时长，默认60秒

    normalTxt: 未开始倒计时的文案

    countdownTxt:倒计时秒数后面的文案

    endTxt: 倒计时结束文案

    auto: 是否自动开始倒计时，默认false

    beforeCountdown:开始倒计时前回调，需要返回boolean值，true：开始倒计时，false：不开始倒计时，这里可以做一些验证，比如手机号的验证

    startCountdown: 倒计时的回调,

    onValueChange: 输入框值变化时的回调

  ![image](https://github.com/781238222/react-native-verify-code/blob/master/examples/screen/3.jpg)
 ![image](https://github.com/781238222/react-native-verify-code/blob/master/examples/screen/1.jpg)
  ![image](https://github.com/781238222/react-native-verify-code/blob/master/examples/screen/2.jpg)
