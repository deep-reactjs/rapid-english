import React, {Component} from 'react';
import c from '../../styles/commonStyle';
import {Home} from '../../navigation/NavigationHelper';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {PrefManager} from '../../utils';
import {connect} from 'react-redux';
import {sendOtp, OtpClear} from '../../redux/actions/authActions';
import {signUp, SignUpClear} from '../../redux/actions/authActions';
// import messaging from '@react-native-firebase/messaging';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import {
  AppRoot,
  Button,
  ScrollableAvoidKeyboard,
  Snackbar,
} from '../../component';
import {
  Colors,
  ImageView,
  Fonts,
  Screen,
  Strings,
  Storage_Key,
  Dimens,
} from '../../config/appConstants';
const s = StyleSheet.create({
  logoStyle: {
    height: Screen.hp(26),
    width: Screen.wp(52),
    alignSelf: 'center',
    margin: 30,
  },
  pwdText: {
    textAlign: 'right',
    right: Screen.wp(15),
    paddingVertical: Screen.hp(2),
    ...c.textNormal,
  },
  inputHighlight: {
    borderColor: Colors.primary,
    height: Screen.wp(18),
    width: Screen.wp(18),
  },
  input: {
    borderBottomWidth: 2,
    borderColor: Colors.medium_gray,
    height: Screen.wp(16),
    width: Screen.wp(16),
    borderRadius: 15,
    marginTop: Screen.hp(5),
    color: Colors.black,
    fontFamily: Fonts.Regular,
    fontSize: 18,
  },
  number: {
    fontFamily: Fonts.Bold,
    color: Colors.primary,
  },
});
var timeInterval = 0;
class OtpVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      timer: 30,
      code: '',
    };
    this.props.navigation.addListener('focus', () => {
      this.startTimer();
    });
    this.props.navigation.addListener('blur', () => {
      clearInterval(timeInterval);
    });
  }

  componentDidMount() {
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  startTimer = () => {
    timeInterval = setInterval(() => {
      if (this.state.timer == 0) {
        clearInterval(timeInterval);
      } else {
        this.setState({timer: this.state.timer - 1});
      }
    }, 1000);
  };

  resendOtp = () => {
    const {email, name, mobile, password} = this?.props?.route?.params;
    this.setState({timer: 30}, () => {
      this.startTimer();
      let request = {
        email: email,
        mobile: mobile
      };
      this.props.signUp(request);
    });
  };

  // static getDerivedStateFromProps(props, state) {
  //   if (Object.keys(props.otpData).length !== 0 ) {
  //     return {
  //       loading: false,
  //     }
  //   }
  // }

  componentDidUpdate(prevProps) {
    const {otpData, loading, navigation, OtpClear, SignUpClear, data} =
      this.props;
    if (Object.keys(otpData).length !== 0 && otpData.status && !loading) {
      PrefManager.setValue(Storage_Key.name, otpData.data.name);
      PrefManager.setValue(Storage_Key.id, otpData.data.id);
      PrefManager.setValue(Storage_Key.phone, otpData.data.mobile);
      PrefManager.setValue(Storage_Key.email, otpData.data.email);
      navigation.dispatch(Home);
      // console.log('data11', otpData.data);
      setTimeout(() => {
        OtpClear();
        SignUpClear();
      }, 500);
    }
    // if (Object.keys(otpData).length !== 0 && !otpData.status && !loading) {
    //   console.log('call1', otpData);
    //   OtpClear();
    // }
  }

  isOtpVerify = async () => {
    const {email, name, mobile, password} = this?.props?.route?.params;
    const token = await messaging().getToken();
    let request = {
      email: email,
      name: name,
      mobile: mobile,
      password: password,
      token:''
    };
    this.props.sendOtp(request);
  };

  render() {
    const {data, loading} = this.props;
    return (
      <AppRoot>
       <View style={{flex: 1, backgroundColor:Colors.white}}>
          <ScrollableAvoidKeyboard
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <Image
              source={ImageView.logo}
              resizeMode={'contain'}
              style={s.logoStyle}
            />
            <Text
              style={[
                c.textBold,
                {marginHorizontal: Screen.hp('2%'), textAlign: 'center'},
              ]}>
              {Strings.otpMessage}
            </Text>
            <OTPInputView
              style={{width: Screen.wp(76), height: 80, alignSelf: 'center'}}
              pinCount={4}
              autoFocusOnLoad={true}
              code={this.state.code}
              selectionColor={Colors.primary}
              codeInputFieldStyle={s.input}
              placeholderTextColor="red"
              codeInputHighlightStyle={s.inputHighlight}
              onCodeChanged={code => this.setState({code: code})}
            />
            <Text
              style={[
                c.textNormal,
                {textAlign: 'center', marginTop: Screen.hp(6)},
              ]}>
              {Strings.codeExp}
              {' :'} 00 : {this.state.timer}
            </Text>
            <TouchableOpacity
              activeOpacity={this.state.timer != 0 ? 1 : 0.6}
              style={{paddingVertical: Screen.hp('2')}}
              onPress={() => {
                if (this.state.timer != 0) {
                } else {
                  this.resendOtp();
                }
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Text style={c.textNormal}>
                  {Strings.coder}
                  {'   '}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'center',
                    textDecorationLine: 'underline',
                    fontFamily: Fonts.SemiBold,
                    color:
                      this.state.timer != 0 ? Colors.dark_gray : Colors.primary,
                  }}>
                  {Strings.resend}
                </Text>
              </View>
            </TouchableOpacity>
            <Button
              text={Strings.verify}
              visible={loading}
              containerStyle={[c.Button, {marginTop: Screen.hp(6)}]}
              onPress={() => {
                console.log('data',data);
                if (Object.keys(data).length !== 0 && data.status) {
                  if (data.data == this.state.code) {
                    this.isOtpVerify();
                  } else {
                    console.log('11');
                    Snackbar(Strings.wrongOtp, Strings.close);
                    this.setState({code: ''});
                  }
                }else{
                  if (this?.props?.route?.params == this.state.code) {
                    this.isOtpVerify();
                  } else {
                    console.log('22');
                    Snackbar(Strings.wrongOtp, Strings.close);
                    this.setState({code: ''});
                  }
                }
              }}
            />
          </ScrollableAvoidKeyboard>
        </View>
      </AppRoot>
    );
  }
}
const mapStateToProps = state => {
  return {
    otpData: state.auth.otpData,
    loading: state.auth.loading,
    data: state.auth.signUpData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sendOtp: data => {
      dispatch(sendOtp(data));
    },
    OtpClear: data => {
      dispatch(OtpClear(data));
    },
    signUp: data => {
      dispatch(signUp(data));
    },
    SignUpClear: data => {
      dispatch(SignUpClear(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OtpVerify);