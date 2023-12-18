import React, {Component} from 'react';
import c from '../../styles/commonStyle';
import {Home} from '../../navigation/NavigationHelper';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {
  AppRoot,
  TextInput,
  Button,
  ScrollableAvoidKeyboard,
  Snackbar,
} from '../../component';
import {
  Strings,
  Colors,
  ImageView,
  Fonts,
  Screen,
  Dimens,
  Storage_Key,
  Constants,
} from '../../config/appConstants';
import {Helper, HttpService, PrefManager} from '../../utils';
import {Facebook} from '../../utils/HttpService';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';
// import { GoogleSignin } from '@react-native-community/google-signin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {connect} from 'react-redux';
import {signIn, SignInClear} from '../../redux/actions/authActions';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/FontAwesome';
const s = StyleSheet.create({
  logoStyle: {
    height: Screen.hp(26),
    width: Screen.wp(46),
    alignSelf: 'center',
    marginTop: Screen.hp('2%'),
  },
  pwdText: {
    ...c.textNormal,
    textAlign: 'right',
    right: Screen.wp(10),
    fontFamily: Fonts.Regular,
    paddingVertical: Screen.hp(2),
    color: Colors.acent,
    fontSize: Dimens.F14,
  },
});
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passError: '',
      flag: false,
      app: 1,
      app1: 1,
    };
    this.isUsername = React.createRef();
    this.isPassword = React.createRef();
    PrefManager.getValue(Storage_Key.app).then(a => {
      PrefManager.getValue(Storage_Key.app1).then(a1 => {
        if (a) {
          this.setState({app: a, app1: a1});
        }
      });
    });
  }

  async componentDidMount() {
    Screen.OrientationChange(this);
    await GoogleSignin.configure({
      webClientId:
        Platform.OS == 'android'
          ? Constants.GOOGLE_SIGNIN_KEY_ANDROID
          : Constants.GOOGLE_SIGNIN_KEY_IOS,
      // scopes: ["https://www.googleapis.com/auth/userinfo.profile"], // what API you want to access on behalf of the user, default is email and profile
      // client_type: 3, // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  FBL = async () => {
    let result;
    try {
      let behavior = Platform.OS === 'ios' ? 'native' : 'WEB_ONLY';
      LoginManager.setLoginBehavior(behavior);
      result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
    } catch (err1) {
      console.log(err1);
      try {
        let behavior = Platform.OS === 'ios' ? 'browser' : 'WEB_ONLY';
        LoginManager.setLoginBehavior(behavior);
        result = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
      } catch (err2) {
        console.log(err2);
      }
    }
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    console.log(data);
    this.initUser(data.accessToken);
  };

  initUser = token => {
    fetch(Facebook + token)
      .then(response => response.json())
      .then(json => {
        this.socialLogin(json, 1);
      })
      .catch(e => {
        console.log(e);
      });
  };

  GL = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      this.socialLogin(userInfo.user, 2);
    } catch (error) {
      console.log('Test', error);
    }
  };

  componentDidUpdate(prevProps) {
    const {data, loading, navigation, SignInClear} = this.props;
    if (Object.keys(data).length !== 0 && data.status && !loading) {
      PrefManager.setValue(Storage_Key.name, data.data.name);
      PrefManager.setValue(Storage_Key.id, data.data.id);
      PrefManager.setValue(Storage_Key.phone, data.data.mobile);
      PrefManager.setValue(Storage_Key.email, data.data.email);
      PrefManager.setValue(Storage_Key.profile, data.data.profile);
      navigation.dispatch(Home);

      // console.log('data', data.data);
    }
    if (Object.keys(data).length !== 0 && !data.status && !loading) {
      SignInClear();
    }
  }

  render() {
    const {navigation, loading} = this.props;
    const {email, password, emailError, passError} = this.state;
    return (
      <AppRoot>
        <View style={{flex: 1, backgroundColor: Colors.white}}>
          <ScrollableAvoidKeyboard
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <Image
              source={ImageView.logo}
              style={s.logoStyle}
              resizeMode={'contain'}
            />
            <TextInput
              value={email}
              errorText={emailError}
              title={Strings.email}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={text =>
                this.setState({email: text, emailError: ''})
              }
              keyboardType={'email-address'}
              placeholder={Strings.email}
              containerStyle={c.loginInput}
              textinputStyle={c.logininputStyle}
              iconName={'person'}
              ref={input => {
                this.isUsername = input;
              }}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.isPassword.getInnerRef().focus();
              }}
            />
            <TextInput
              value={password}
              title={Strings.password}
              secureTextEntry={true}
              errorText={passError}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={text =>
                this.setState({password: text, passError: ''})
              }
              keyboardType={'default'}
              placeholder={Strings.password}
              containerStyle={[c.loginInput, {marginTop: Screen.hp(2)}]}
              textinputStyle={c.logininputStyle}
              iconName={'lock'}
              ref={input => {
                this.isPassword = input;
              }}
              returnKeyType={'go'}
              onSubmitEditing={() => this.login()}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate('FPassword');
              }}>
              <Text style={s.pwdText}>{Strings.fpwd}</Text>
            </TouchableOpacity>

            <Button
              text={Strings.Signin}
              visible={loading}
              containerStyle={[c.Button, {marginBottom: Screen.hp(2)}]}
              onPress={() => this.login()}
            />

            <Text style={[c.textBold, {alignSelf: 'center'}]}>{'or'}</Text>
            {(
              Platform.OS == 'ios' ? this.state.app1 == 0 : this.state.app != 0
            ) ? (
              <View
                style={{
                  // flexDirection: 'row',
                  alignItems: 'center',
                  // paddingVertical: Screen.hp('4.5%'), // disabled fb login for now
                  justifyContent: 'space-between',
                  width: '60%',
                  alignSelf: 'center',
                }}>
                {/* <TouchableOpacity  // disabled fb login for now
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    backgroundColor: '#1877f2',
                    borderRadius: 10,
                    width: '100%',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                  }}
                  onPress={() => this.FBL()}>
                  <Icon name="facebook" size={24} style={{paddingLeft: 2}} color={Colors.white} />
                  <Text
                    style={{
                      fontFamily: Fonts.SemiBold,
                      fontSize: Dimens.F16,
                      color: Colors.white,
                      paddingLeft: 22
                    }}>
                    Continue with Facebook
                  </Text>
                </TouchableOpacity> */}
                {/* <View
                  style={{
                    width: 1,
                    height: 36,
                    backgroundColor: Colors.medium_gray,
                  }}
                /> */}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'center',
                    backgroundColor: '#e44133',
                    borderRadius: 10,
                    width: '100%',
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    marginTop: 12
                  }}
                  onPress={() => this.GL()}>
                  {/* <Image
                    source={ImageView.google}
                    style={{height: 40, width: 40}}
                    resizeMode="center"
                  /> */}
                     <Icon name="google" size={24} color={Colors.white} />
                  <Text
                  style={{
                    fontFamily: Fonts.SemiBold,
                    fontSize: Dimens.F16,
                    color: Colors.white,
                    paddingLeft: 22
                  }}>
                    Continue with Google</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: Screen.hp('5%'),
                alignSelf: 'center',
              }}>
              <Text style={[c.textNormal, {alignSelf: 'center'}]}>
                {Strings.accunt}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text
                  style={[
                    c.textNormal,
                    {color: Colors.primary, fontFamily: Fonts.SemiBold},
                  ]}>
                  {' ' + Strings.Signup}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollableAvoidKeyboard>
        </View>
      </AppRoot>
    );
  }

  login = async () => {
    const {email, password} = this.state;
    const token = await messaging()?.getToken();
    console.log({token})
    if (!email) {
      Snackbar(Strings.eEmail, Strings.close);
      return;
    }
    if (!Helper.isValideEmail(email)) {
      Snackbar(Strings.wrongEmail, Strings.close);
      return;
    }
    if (!password) {
      Snackbar('Please Enter ' + Strings.password, Strings.close);
      return;
    }
    if (password.length < 8) {
      Snackbar('Your password must be at least 8 characters', Strings.close);
      return;
    }
    if (!/[a-z]/.test(password)) {
      Snackbar(
        'Your password must be at least 1 uper case and 1 lower case character',
        Strings.close,
      );
      return;
    }

    if (!/[A-Z]/.test(password)) {
      Snackbar(
        'Your password must be at least 1 uper case and 1 lower case character',
        Strings.close,
      );
      return;
    }

    if (!/[0-9]/.test(password)) {
      Snackbar('Your password must be have 1 number', Strings.close);
      return;
    }
    let request = {
      email: email,
      password: password,
      token: token,
    };
    this.props.signIn(request);
  };

  socialLogin = async (data, type) => {
    const token = await messaging().getToken();
    let request = {
      email: data.email,
      name: data.name,
      profile:
        type == 1
          ? data.picture.data.url
            ? data.picture.data.url
            : ''
          : data.profile,
      social: 1,
      token: token,
    };
    console.log('request', request);
    this.props.signIn(request);
  };
}
const mapStateToProps = state => {
  return {
    data: state.auth.signInData,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: data => {
      dispatch(signIn(data));
    },
    SignInClear: data => {
      dispatch(SignInClear(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
