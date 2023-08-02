import React, {Component} from 'react';
import c from '../../styles/commonStyle';
import {Home} from '../../navigation/NavigationHelper';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {
  AppRoot,
  TextInput,
  Button,
  ScrollableAvoidKeyboard,Snackbar
} from '../../component';
import {
  Strings,
  Colors,
  ImageView,
  Fonts,
  Dimens,
  Screen,
  Storage_Key,
} from '../../config/appConstants';
import {connect} from 'react-redux';
import {Helper, PrefManager} from '../../utils';
import {signUp,SignUpClear} from '../../redux/actions/authActions';
const s = StyleSheet.create({
  logoStyle: {
    height: Screen.hp(26),
    width: Screen.wp(46),
    alignSelf: 'center',
    marginTop: Screen.hp('2%'),
  },
  pwdText: {
    textAlign: 'right',
    right: Screen.wp(15),
    paddingVertical: Screen.hp(2),
    ...c.textNormal,
  },
});
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,

      name: '',
      nameError: '',

      email: '',
      emailError: '',

      mobile: '',
      mobileError: '',

      password: '',
      passwordError: '',
    };

    this.isName = React.createRef();
    this.isEmail = React.createRef();
    this.isPhone = React.createRef();
    this.isPassword = React.createRef();
  }
  componentDidMount() {
    const { SignUpClear } = this.props;
    SignUpClear()
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }
  componentDidUpdate(prevProps) {
    const { data, loading, navigation, SignUpClear } = this.props;
    const { email, name, mobile, password } = this.state;
    // console.log(data,'data');
    if (Object.keys(data).length !== 0 && data.status && !loading) {
      // PrefManager.setValue(Storage_Key.name, data.data.name)
      // PrefManager.setValue(Storage_Key.id, data.data.id)
      // PrefManager.setValue(Storage_Key.phone, data.data.mobile)
      // PrefManager.setValue(Storage_Key.email, data.data.email)
      // PrefManager.setValue(Storage_Key.profile, data.data.profile)
      navigation.navigate('OtpVerify',{
        email: email,
        name: name,
        mobile: mobile,
        password: password,
        otp:data.data
      });
      // console.log('data', data);
      // setTimeout(() => {
      //   SignUpClear()
      // }, 500);
    }
  }
  // static getDerivedStateFromProps(props, state) {
  //   if (Object.keys(props.data).length !== 0) {
  //     return {
  //       loading: false,
  //     }
  //   }
  // }
  render() {
    const { navigation, loading } = this.props;
    const {
      name,
      nameError,
      email,
      emailError,
      mobile,
      mobileError,
      password,
      passwordError,
    } = this.state;
    return (
      <AppRoot>
          <View style={{flex: 1, backgroundColor:Colors.white}}>
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
              value={name}
              errorText={nameError}
              title={Strings.name}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={text => this.setState({name: text, nameError: ''})}
              keyboardType={'default'}
              placeholder={Strings.name}
              containerStyle={[c.loginInput, {marginTop: Screen.hp(2)}]}
              textinputStyle={c.logininputStyle}
              iconName={'person'}
              ref={input => {
                this.isName = input;
              }}
              returnKeyType={'next'}
              onSubmitEditing={() => {}}
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
              containerStyle={[c.loginInput, {marginTop: Screen.hp(2)}]}
              textinputStyle={c.logininputStyle}
              iconName={"email"}
              ref={input => {
                this.isEmail = input;
              }}
              returnKeyType={'next'}
              onSubmitEditing={() => {}}
            />

            <TextInput
              value={mobile}
              errorText={mobileError}
              title={Strings.Phone}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={text =>
                this.setState({mobile: text, mobileError: ''})
              }
              maxLength={10}
              keyboardType={'phone-pad'}
              placeholder={Strings.Phone}
              containerStyle={[c.loginInput, {marginTop: Screen.hp(2)}]}
              textinputStyle={c.logininputStyle}
              iconName={'smartphone'}
              ref={input => {
                this.isPhone = input;
              }}
              returnKeyType={'next'}
              onSubmitEditing={() => {}}
            />

            <TextInput
              value={password}
              title={Strings.password}
              errorText={passwordError}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={text =>
                this.setState({password: text, passwordError: ''})
              }
              keyboardType={'default'}
              placeholder={Strings.password}
              containerStyle={[c.loginInput, {marginTop: Screen.hp(2)}]}
              textinputStyle={c.logininputStyle}
              // imagename={ImageView.pwd}
              secureTextEntry={true}
              iconName={'lock'}
              ref={input => {
                this.isPassword = input;
              }}
              returnKeyType={'go'}
              onSubmitEditing={() => {
                this.isSignUp();
              }}
            />

            <Button
              text={Strings.Signup}
              visible={loading}
              containerStyle={[c.Button, {marginTop: Screen.hp('5%')}]}
              onPress={() => {
                this.isSignUp();
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: Screen.hp('5%'),
                alignSelf: 'center',
              }}>
              <Text style={[c.textNormal, {alignSelf: 'center'}]}>
                {Strings.noaccunt}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Signin');
                }}>
                <Text
                  style={[
                    c.textNormal,
                    {color: Colors.primary, fontFamily: Fonts.SemiBold},
                  ]}>
                  {' ' + Strings.Signin}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollableAvoidKeyboard>
        </View>
      </AppRoot>
    );
  }
  
  isSignUp = () => {
    const {email, name, mobile, password} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    console.log('email',email);
    if (!name) {
      Snackbar('Enter your Name', Strings.close);
      return;
    }
    if (!email) {
      Snackbar(Strings.eEmail, Strings.close);
      return;
    }
    if (reg.test(this.state.email) === false) {
      Snackbar(Strings.eEmail2, Strings.close);
      return;
    }
    if (!mobile) {
      Snackbar('Enter your mobile number', Strings.close);
      return;
    }
    if (mobile.length < 10) {
      Snackbar(Strings.wrongPhone, Strings.close);
      return;
    }
    if (password.length < 8) {
      Snackbar('Your password must be at least 8 characters', Strings.close);
      return;
    }
    if (!/[a-z]/.test(password)) {
      Snackbar(
        'Your password must be at least 1 upper case and 1 lower case character',
        Strings.close,
      );
      return;
    }

    if (!/[A-Z]/.test(password)) {
      Snackbar(
        'Your password must be at least 1 upper case and 1 lower case character',
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
      mobile: mobile
    };
    this.props.signUp(request);
  };
}

const mapStateToProps = state => {
  return {
    data: state.auth.signUpData,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: data => {
      dispatch(signUp(data))
    },
    SignUpClear: data => {
      dispatch(SignUpClear(data))
    },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
