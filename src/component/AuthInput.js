// import React, { Component } from "react";
// import c from "../../styles/commonStyle";
// import { Home } from "../../navigation/NavigationHelper";
// import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
// import {
//   AppRoot,
//   TextInput,
//   Button,
//   ScrollableAvoidKeyboard,
// } from "../../component";
// import {
//   Strings,
//   Colors,
//   ImageView,
//   Fonts,
//   Screen,
//   Dimens,
// } from "../../config/appConstants";
// import { HttpService } from '../../utils'
// import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
// import { GoogleSignin } from '@react-native-community/google-signin';
// const s = StyleSheet.create({
//   logoStyle: {
//     height: Screen.hp(25),
//     width: Screen.wp(25),
//     alignSelf: "center",
//     marginTop: Screen.hp("2%"),
//   },
//   pwdText: {
//     ...c.textNormal,
//     textAlign: "right",
//     right: Screen.wp(10),
//     fontFamily: Fonts.Regular,
//     paddingVertical: Screen.hp(2),
//     color: Colors.acent,
//     fontSize: Dimens.F14,
//   },
// });
// class Signin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       email: "",
//       password: "",
//       emailError: "",
//       passError: "",
//     };
//     this.isUsername = React.createRef();
//     this.isPassword = React.createRef();
//   }

//   componentDidMount() {
//     Screen.OrientationChange(this);
//     GoogleSignin.configure({
//       webClientId: '1006999898368-pbaju7i767ucdsa5ju7s2isbosdfbq3n.apps.googleusercontent.com',
//     });
//   }

//   componentWillUnmount() {
//     Screen.OrientationListener();
//   }


//   FBL = async () => {
//     let result;
//     try {
//       let behavior = Platform.OS === 'ios' ? 'native' : 'WEB_ONLY';
//       LoginManager.setLoginBehavior(behavior);
//       result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

//     } catch (err1) {
//       console.log(err1);
//       try {
//         let behavior = Platform.OS === 'ios' ? 'browser' : 'WEB_ONLY';
//         LoginManager.setLoginBehavior(behavior);
//         result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

//       } catch (err2) {
//         console.log(err2);
//       }
//     }
//     if (result.isCancelled) {
//       throw 'User cancelled the login process';
//     }
//     const data = await AccessToken.getCurrentAccessToken();

//     if (!data) {
//       throw 'Something went wrong obtaining access token';
//     }
//     console.log(data);
//     this.initUser(data.accessToken)
//   }
//   initUser = (token) => {
//     fetch(HttpService.Facebook + token)
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         // token, json
//       })
//       .catch((e) => {
//         console.log(e);
//       })
//   };


//   GL = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.log(userInfo.user)
//     } catch (error) {
//       console.log("Test", error);
//     }
//   }

//   render() {
//     const { navigation } = this.props;
//     const { email, password, emailError, passError } = this.state;
//     return (
//       <AppRoot>
//         <View style={c.flexStyle}>
//           <ScrollableAvoidKeyboard
//             style={{ flex: 1 }}
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps={"handled"}
//           >
//             <Image
//               source={ImageView.logo}
//               style={s.logoStyle}
//               resizeMode={"contain"}
//             />
//             <TextInput
//               value={email}
//               errorText={this.state.emailError}
//               title={Strings.email}
//               placeholderTextColor={Colors.dark_gray}
//               onChangeText={(text) =>
//                 this.setState({ email: text, emailError: "" })
//               }
//               keyboardType={"email-address"}
//               placeholder={Strings.email}
//               containerStyle={c.loginInput}
//               textinputStyle={c.logininputStyle}
//               iconName={"person"}
//               ref={(input) => {
//                 this.isUsername = input;
//               }}
//               returnKeyType={"next"}
//               onSubmitEditing={() => {
//                 this.isPassword.getInnerRef().focus();
//               }}
//             />
//             <TextInput
//               value={password}
//               title={Strings.password}
//               secureTextEntry={true}
//               errorText={this.state.passError}
//               placeholderTextColor={Colors.dark_gray}
//               onChangeText={(text) =>
//                 this.setState({ password: text, passError: "" })
//               }
//               keyboardType={"default"}
//               placeholder={Strings.password}
//               containerStyle={[c.loginInput, { marginTop: Screen.hp(2) }]}
//               textinputStyle={c.logininputStyle}
//               iconName={"lock"}
//               ref={(input) => {
//                 this.isPassword = input;
//               }}
//               returnKeyType={"go"}
//               onSubmitEditing={() => this.login()}
//             />
//             <TouchableOpacity
//               activeOpacity={0.9}
//               onPress={() => {
//                 navigation.navigate("ForgotPassword");
//               }}
//             >
//               <Text style={s.pwdText}>{Strings.fpwd}</Text>
//             </TouchableOpacity>

//             <Button
//               text={Strings.Signin}
//               visible={this.state.loading}
//               containerStyle={[c.Button, { marginBottom: Screen.hp(2) }]}
//               onPress={() => this.login()}
//             />

//             <Text style={[c.textBold, { alignSelf: "center" }]}>{"or"}</Text>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 paddingVertical: Screen.hp("4.5%"),
//                 justifyContent: "space-between",
//                 width: "25%",
//                 alignSelf: "center",
//               }}
//             >
//               <TouchableOpacity onPress={() => this.FBL()}>
//                 <Image
//                   source={ImageView.fb}
//                   style={{ height: 40, width: 40 }}
//                   resizeMode="center"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => this.GL()}>
//                 <Image
//                   source={ImageView.google}
//                   style={{ height: 40, width: 40 }}
//                   resizeMode="center"
//                 />
//               </TouchableOpacity>
//             </View>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 paddingVertical: Screen.hp("5%"),
//                 alignSelf: "center",
//               }}
//             >
//               <Text style={[c.textNormal, { alignSelf: "center" }]}>
//                 {Strings.accunt}
//               </Text>

//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.navigate("Signup");
//                 }}
//               >
//                 <Text
//                   style={[
//                     c.textNormal,
//                     { color: Colors.primary, fontFamily: Fonts.SemiBold },
//                   ]}
//                 >
//                   {" " + Strings.Signup}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollableAvoidKeyboard>
//         </View>
//       </AppRoot>
//     );
//   }

//   login = () => {
//     const { email, password } = this.state;
//     this.props.navigation.dispatch(Home);
//   }

// }

// export default Signin;



import React, { Component } from "react";

import c from "../../styles/commonStyle";
import { Home } from "../../navigation/NavigationHelper";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import {
  AppRoot,
  TextInput,
  Button,
  ScrollableAvoidKeyboard,
} from "../../component";
import {
  Strings,
  Colors,
  ImageView,
  Fonts,
  Dimens,
  Screen,
} from "../../config/appConstants";
const s = StyleSheet.create({
  logoStyle: {
    height: Screen.hp(25),
    width: Screen.wp(25),
    alignSelf: "center",
    marginTop: Screen.hp("2%"),
  },
  pwdText: {
    textAlign: "right",
    right: Screen.wp(15),
    paddingVertical: Screen.hp(2),
    ...c.textNormal,
  },
});
function isequal(str) {
  let n = str.length;

  // Traverse string from end and find
  // the number stored at the end.
  // x is used to store power of 10.
  let num = 0, x = 1, i = n - 1;
  for (i = n - 1; i >= 0; i--) {
    if ('0' <= str[i] &&
      str[i] <= '9') {
      num = (str[i] - '0') * x + num;
      x = x * 10;

      if (num >= n)
        return false;
    }
    else
      break;
  }

  // Check if number is equal to string
  // length except that number's digits
  return num == i + 1;
}
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      emailError: "",
      name: "",
      nameError: "",
      mobile: "",
      mobileError: "",
      address: "",
      addressError: "",
      password: "",
      passwordError: ""
    };
    this.isUsername = React.createRef();
    this.isPassword = React.createRef();
  }
  componentDidMount() {
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }
  componentDidUpdate(prevProps) {
    const { } = this.props;
  }
  numberFormat = (number) => {
    console.log('number',number);
//     if (isequal(number)) {
// console.log('fuck');
//     } else {
      try {
        return new Intl.NumberFormat('en-US').format(parseFloat(number).toFixed(2));
      } catch (error) {
        return;
      }
    // }
  }
  render() {
    const { navigation } = this.props;
    const {
      email,
      emailError,
      name,
      nameError,
      mobile,
      mobileError,
      address,
      addressError,
      password,
      passwordError
    } = this.state;
    return (
      <AppRoot>
        <View style={c.flexStyle}>
          <ScrollableAvoidKeyboard
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"handled"}
          >
            <Image
              source={ImageView.logo}
              style={s.logoStyle}
              resizeMode={"contain"}
            />
            <TextInput
              value={email}
              errorText={emailError}
              title={Strings.email}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={(text) =>
                this.setState({ email: text, emailError: "" })
              }
              keyboardType={"email-address"}
              placeholder={Strings.email}
              containerStyle={c.loginInput}
              textinputStyle={c.logininputStyle}
              iconName={"person"}
              ref={(input) => {
                this.isUsername = input;
              }}
              returnKeyType={"next"}
              onSubmitEditing={() => { }}
            />
            <TextInput
              value={name}
              errorText={nameError}
              title={Strings.name}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={(text) =>
                this.setState({ name: text, nameError: "" })
              }
              keyboardType={"default"}
              placeholder={Strings.name}
              containerStyle={[c.loginInput, { marginTop: Screen.hp(2) }]}
              textinputStyle={c.logininputStyle}
              iconName={"person"}
              ref={(input) => {
                this.isUsername = input;
              }}
              returnKeyType={"next"}
              onSubmitEditing={() => { }}
            />
            <TextInput
              value={mobile}
              errorText={mobileError}
              title={Strings.Phone}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={(t) => {
                console.log('i',t.split('')[t.split('').length - 1]);
                if(t){
                  if (t.split('')[t.split('').length - 1] == '.') {
                    if (!mobile.includes('.')) {                    
                      console.log('mobile',);
                      this.setState({ mobile: mobile + '.' })
                    }               
                  } else {
                    this.setState({ mobile:this.numberFormat(t.replaceAll(',', '')) })
                  }  
                }else{
                  this.setState({ mobile:''})
                }
               }
              }
              keyboardType='decimal-pad'
              placeholder={Strings.Phone}
              containerStyle={[c.loginInput, { marginTop: Screen.hp(2) }]}
              textinputStyle={c.logininputStyle}
              iconName={"smartphone"}
              ref={(input) => {
                this.isUsername = input;
              }}
              returnKeyType={"next"}
              onSubmitEditing={() => { }}
            />

            <TextInput
              value={address}
              errorText={addressError}
              value={address}
              title={Strings.address}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={(text) =>
                this.setState({ address: text, addressError: "" })
              }
              keyboardType={"default"}
              placeholder={Strings.address}
              containerStyle={[c.loginInput, { marginTop: Screen.hp(2) }]}
              textinputStyle={c.logininputStyle}
              // imagename={ImageView.address}
              iconName={"location-pin"}
              ref={(input) => {
                this.isUsername = input;
              }}
              returnKeyType={"next"}
              onSubmitEditing={() => {
                // this.isPassword.getInnerRef().focus();
              }}
            />

            <TextInput
              value={password}
              title={Strings.password}
              errorText={this.state.passwordError}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={(text) =>
                this.setState({ password: text, passwordError: "" })
              }
              keyboardType={"default"}
              placeholder={Strings.password}
              containerStyle={[c.loginInput, { marginTop: Screen.hp(2) }]}
              textinputStyle={c.logininputStyle}
              // imagename={ImageView.pwd}
              iconName={"lock"}
              ref={(input) => {
                this.isPassword = input;
              }}
              returnKeyType={"go"}
              onSubmitEditing={() => {
                this.signUp();
              }}
            />

            <Button
              text={Strings.Signup}
              visible={this.state.loading}
              containerStyle={[c.Button, { marginTop: Screen.hp("5%") }]}
              onPress={() => {
                this.signUp();
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: Screen.hp("5%"),
                alignSelf: "center",
              }}
            >
              <Text style={[c.textNormal, { alignSelf: "center" }]}>
                {Strings.noaccunt}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Signin");
                }}
              >
                <Text
                  style={[
                    c.textNormal,
                    { color: Colors.primary, fontFamily: Fonts.SemiBold },
                  ]}
                >
                  {" " + Strings.Signin}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollableAvoidKeyboard>
        </View>
      </AppRoot>
    );
  }
  signUp = () => {
    const { email, name, mobile, address, password } = this.state;
    this.props.navigation.dispatch(Home);
  };
}

export default SignUp;