import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {
  AppRoot,
  Header,
  TextInput,
  ScrollableAvoidKeyboard,
  Button,
  Snackbar
} from '../../component';
import {
  Colors,
  Fonts,
  Strings,
  Screen,
  Dimens,
  ImageView,
  Storage_Key,
} from '../../config/appConstants';
import c from '../../styles/commonStyle';
import { Helper, PrefManager } from '../../utils';
import { connect } from 'react-redux';
import {
  forgotPasswordActions, forgotPasswordClear
} from '../../redux/actions/forgotPasswordActions';
const styles = StyleSheet.create({
  flexBox: {
    width: Screen.width,
    height: Screen.height / 3.5,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    position: 'relative',
    backgroundColor: Colors.white,
  },
  camStyles: {
    width: 36,
    height: 36,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    right: 10,
    zIndex: 10,
    shadowColor: Colors.blackColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  textStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.F16,
  },
  viewRoot: {
    height: '34%',
    alignSelf: 'center',
    marginVertical: 0,
    marginTop: 20,
    paddingHorizontal: 10,
    width: '86%',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  img15: {
    height: 15,
    width: 15,
  },
  textNormal: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    paddingHorizontal: 8,
    textAlign: 'left',
  },
});
var Lower = false,
  Capital = false,
  Number = false,
  Minimum = false,
  ButtonVisible = false;
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPwd: '',
      newPwd: '',
      confirmPwd: ''
    };
    this.isOldPwd = React.createRef();
    this.isNewPwd = React.createRef();
    this.isConfirmPwd = React.createRef();
  }
  componentDidMount() {
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }
  componentDidUpdate(prevProps) {
    const { loading, forgotPasswordData, forgotPasswordClear, navigation } = this.props;
    if (Object.keys(forgotPasswordData).length !== 0 && forgotPasswordData.status && !loading) {
      forgotPasswordClear()
      navigation.goBack();
    }
  }

  render() {
    const { navigation, loading } = this.props;
    const { oldPwd, newPwd, confirmPwd } = this.state;
    return (
      <AppRoot>
        <View style={c.flexStyle}>
          <Header
            text={'Reset Password'}
            onBack={() => navigation.goBack()}
            onLogout={() => navigation.navigate('Signin')}
          />
          <ScrollableAvoidKeyboard
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <TextInput
              fontBold
              value={oldPwd}
              title={Strings.oldPwd}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={text => this.setState({ oldPwd: text })}
              placeholder={Strings.opassword}
              containerStyle={c.profileInput}
              textinputStyle={c.logininputStyle}
              ref={input => (this.isOldPwd = input)}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.isNewPwd.getInnerRef().focus();
              }}
              secureTextEntry={true}
              iconName={'lock'}
            />

            <View style={styles.viewRoot}>
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  fontSize: 16,
                  paddingVertical: 8,
                  textAlign: 'left',
                  color: '#1a1a1a',
                }}>
                {Strings.newpcf}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 6,
                }}>
                <Image
                  resizeMode={'center'}
                  source={ImageView.close}
                  style={{
                    ...styles.img15,
                    tintColor: Lower ? Colors.green : Colors.red,
                  }}
                />

                <Text
                  style={{
                    ...styles.textNormal,
                    color: Lower ? Colors.green : Colors.red,
                  }}>
                  {Strings.ll}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 6,
                }}>
                <Image
                  resizeMode={'center'}
                  source={ImageView.close}
                  style={{
                    ...styles.img15,
                    tintColor: Capital ? Colors.green : Colors.red,
                  }}
                />

                <Text
                  style={{
                    ...styles.textNormal,
                    color: Capital ? Colors.green : Colors.red,
                  }}>
                  {Strings.cl}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 6,
                }}>
                <Image
                  resizeMode={'center'}
                  source={ImageView.close}
                  style={{
                    ...styles.img15,
                    tintColor: Number ? Colors.green : Colors.red,
                  }}
                />

                <Text
                  style={{
                    ...styles.textNormal,
                    color: Number ? Colors.green : Colors.red,
                  }}>
                  {Strings.num}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 6,
                }}>
                <Image
                  resizeMode={'center'}
                  source={ImageView.close}
                  style={{
                    ...styles.img15,
                    tintColor: Minimum ? Colors.green : Colors.red,
                  }}
                />

                <Text
                  style={{
                    ...styles.textNormal,
                    color: Minimum ? Colors.green : Colors.red,
                  }}>
                  {Strings.mc}
                </Text>
              </View>
            </View>

            <TextInput
              fontBold
              value={newPwd}
              onChangeText={password => {
                function isValid(password) {
                  if (/[a-z]/.test(password)) {
                    Lower = true;
                  } else {
                    Lower = false;
                  }

                  if (/[A-Z]/.test(password)) {
                    Capital = true;
                  } else {
                    Capital = false;
                  }

                  if (/[0-9]/.test(password)) {
                    Number = true;
                  } else {
                    Number = false;
                  }

                  if (password.length >= 8) {
                    Minimum = true;
                  } else {
                    Minimum = false;
                  }

                  if (
                    Lower == true &&
                    Capital == true &&
                    Number == true &&
                    Minimum == true
                  ) {
                    ButtonVisible = true;
                  } else {
                    ButtonVisible = false;
                  }
                }
                isValid(password);
                this.setState({ newPwd: password });
              }}
              title={Strings.npassword}
              placeholderTextColor={Colors.dark_gray}
              placeholder={Strings.npassword}
              containerStyle={c.profileInput}
              textinputStyle={c.logininputStyle}
              ref={input => {
                this.isNewPwd = input;
              }}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.isConfirmPwd.getInnerRef().focus();
              }}
              secureTextEntry={true}
              iconName={'lock'}
            />

            <TextInput
              fontBold
              value={confirmPwd}
              onChangeText={text => this.setState({ confirmPwd: text })}
              onChangeText={password => {
                function isValid(password) {
                  if (/[a-z]/.test(password)) {
                    Lower = true;
                  } else {
                    Lower = false;
                  }

                  if (/[A-Z]/.test(password)) {
                    Capital = true;
                  } else {
                    Capital = false;
                  }

                  if (/[0-9]/.test(password)) {
                    Number = true;
                  } else {
                    Number = false;
                  }

                  if (password.length >= 8) {
                    Minimum = true;
                  } else {
                    Minimum = false;
                  }

                  if (
                    Lower == true &&
                    Capital == true &&
                    Number == true &&
                    Minimum == true
                  ) {
                    ButtonVisible = true;
                  } else {
                    ButtonVisible = false;
                  }
                }
                isValid(password);
                this.setState({ confirmPwd: password });
              }}
              title={Strings.cpassword}
              placeholderTextColor={Colors.dark_gray}
              placeholder={Strings.cpassword}
              containerStyle={c.profileInput}
              textinputStyle={c.logininputStyle}
              ref={input => {
                this.isConfirmPwd = input;
              }}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.validation();
              }}
              secureTextEntry={true}
              iconName={'lock'}
            />

            <View style={{ height: 100 }} />
          </ScrollableAvoidKeyboard>
          <Button
            text={'Update'}
            visible={loading}
            containerStyle={[c.Button, { marginBottom: Screen.hp(2.5) }]}
            onPress={() => this.validation()}
          />
        </View>
      </AppRoot>
    );
  }
  validation = async () => {
    const { oldPwd, newPwd, confirmPwd } = this.state;
    if (!oldPwd) {
      Snackbar('' + Strings.opassword1, Strings.close);
      return;
    }
    if (!newPwd) {
      Snackbar(Strings.npassword1, Strings.close);
      return;
    }
    if (!confirmPwd) {
      Snackbar(Strings.cpassword1, Strings.close);
      return;
    }
    if (newPwd != confirmPwd) {
      Snackbar(Strings.passwordM, Strings.close);
      return;
    }

    let id = await PrefManager.getValue(Storage_Key.id);
    let request = {
      id: id,
      password: oldPwd,
      n_password: newPwd,
      c_password: confirmPwd
    };
    this.props.forgotPasswordActions(request);
  };
}
const mapStateToProps = state => {
  return {
    forgotPasswordData: state.forgotPassword.forgotPasswordData,
    loading: state.forgotPassword.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotPasswordActions: data => {
      dispatch(forgotPasswordActions(data));
    },
    forgotPasswordClear: data => {
      dispatch(forgotPasswordClear(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

// import React, { Component } from 'react';
// import {
//   View,
//   StyleSheet,
//   Animated,
//   ScrollView,
//   Platform,
//   SafeAreaView,
//   Dimensions,
//   Text, ImageBackground,
//   Image, TouchableOpacity,
//   KeyboardAvoidingView
// } from 'react-native';
// import Colors from '../common/Colors';
// import Header from '../components/Header';
// import Fonts from '../common/Fonts';
// import LabelTextInput from '../components/LabelTextInput';
// import CustomButton from '../components/CustomButton';

// import { StackActions, NavigationActions } from 'react-navigation';

// import API from '../common/API';
// import timeout from '../common/Timeout';
// import Loader from '../common/Loader';
// import Toast from 'react-native-simple-toast';
// import AsyncStorage from '@react-native-community/async-storage';
// import Orientation from 'react-native-orientation'
// import * as NetInfo from "@react-native-community/netinfo";

// var width = Dimensions.get('window').width;
// var height = Dimensions.get('window').height;

// var Lower = false,
//   Capital = false,
//   Number = false,
//   Minimum = false, ButtonVisible = false;
// export default class DishEndInspection extends Component {
//   static navigationOptions = ({ navigation }) => ({
//     header: null,
//   });
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       dataSource: [],
//       isDateTimePickerVisible: false,
//       isDateTimePickerVisible1: false,
//       date: new Date(),
//       date1: new Date(),
//       stickyHeaderHeight: 60,
//       anim: new Animated.Value(0),
//       scrollY: new Animated.Value(0),
//       opacityValue: new Animated.Value(1),
//       enableScrollViewScroll: true,
//       editPage: false,
//       old_password: '',
//       password: '',
//       c_password: '',

//     };

//     this.AnimatedHeaderValue = new Animated.Value(0);
//   }

//   _handleDrawer = () => {

//     this.props.navigation.openDrawer();
//   };
//   componentDidMount() {
//     Orientation.lockToPortrait();
//   }

//   ChangePassword = () => {
//     console.log(Lower == true && Capital == true && Number == true && Minimum == true);
//     if (this.state.old_password == "") {
//       Toast.show(
//         'Please enter your old password',
//         Toast.SHORT,
//         Toast.BOTTOM,
//       );
//     } else if (this.state.password == "") {
//       Toast.show(
//         'Please enter your new password',
//         Toast.SHORT,
//         Toast.BOTTOM,
//       );
//     }

//     else if (this.state.password != this.state.c_password) {
//       Toast.show(
//         'Password do not match',
//         Toast.SHORT,
//         Toast.BOTTOM,
//       );
//     } else {
//       this.setState({ loading: true });
//       AsyncStorage.getItem('id').then(id => {
//         AsyncStorage.getItem('token').then(token => {
//           var Request = {
//             id: id,
//             token: token,
//             password: this.state.password,
//             old: this.state.old_password,
//           };
//           console.log(API.change_password);
//           console.log(JSON.stringify(Request));
//           NetInfo.fetch().then(state => {
//             if (state.isConnected) {
//               timeout(
//                   30000,
//                 fetch(API.change_password, {
//                   method: 'POST',
//                   headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify(Request),
//                 })
//                   .then(res => res.json())
//                   .then(res => {
//                     console.log('Login RESPONCE:::  ', res);
//                     if (res.status == 'success') {
//                       if (res.message) {
//                         setTimeout(() => {
//                           Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
//                         }, 50);
//                       }
//                       AsyncStorage.removeItem('id');
//                       AsyncStorage.removeItem('username');
//                       AsyncStorage.removeItem('name');
//                       AsyncStorage.removeItem('email');
//                       AsyncStorage.removeItem('branch_id');
//                       AsyncStorage.removeItem('type_id');
//                       AsyncStorage.removeItem('digit_password');
//                       AsyncStorage.removeItem('password');

//                       const resetAction = StackActions.reset({
//                         index: 0,
//                         actions: [
//                           NavigationActions.navigate({ routeName: "Login" })
//                         ]
//                       });
//                       this.props.navigation.dispatch(resetAction);

//                       this.setState({ loading: false });
//                     } else if (res.status == 'failed') {
//                       AsyncStorage.removeItem('id');
//                       AsyncStorage.removeItem('email');
//                       AsyncStorage.removeItem('password');
//                       this.setState({ loading: false });
//                       setTimeout(() => {
//                         Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
//                       }, 50);
//                       const resetAction = StackActions.reset({
//                         index: 0,
//                         actions: [
//                           NavigationActions.navigate({ routeName: 'Login' }),
//                         ],
//                       });
//                       this.props.navigation.dispatch(resetAction);
//                     } else {
//                       setTimeout(() => {
//                         Toast.show(res.message, Toast.SHORT, Toast.BOTTOM);
//                       }, 50);
//                       this.setState({ loading: false });
//                     }
//                   })
//                   .catch(e => {

//                     NetInfo.fetch().then(state => {
//                       if (!state.isConnected) {
//                         Toast.show(
//                           'Please Check your internet connection',
//                           Toast.SHORT,
//                           Toast.BOTTOM,
//                         );
//                         this.props.navigation.navigate('Home')
//                         this.setState({ loading: false });
//                       } else {
//                         this.setState({ loading: false });
//                         console.log(e);
//                         Toast.show(
//                           'Something went wrong...',
//                           Toast.SHORT,
//                           Toast.BOTTOM,
//                         );

//                       }
//                     })

//                   }),
//               ).catch(e => {
//                 console.log(e);
//                 this.setState({ loading: false });
//                 Toast.show(
//                   'Please Check your internet connection',
//                   Toast.SHORT,
//                   Toast.BOTTOM,
//                 );
//               });
//             } else {
//               this.setState({ loading: false });
//               Toast.show(
//                 'Please Check your internet connection',
//                 Toast.SHORT,
//                 Toast.BOTTOM,
//               );
//             }
//           });
//         });
//       });
//     }
//   };

//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
//         <Loader loading={this.state.loading} />
//         <KeyboardAvoidingView
//           behavior={Platform.OS == 'ios' ? 'padding' : null}
//           style={{ flex: 1, backgroundColor: Colors.white, }}>

//           <Header
//             backIcon={require('../images/menu.png')}
//             pageTitle="Change Password"
//             back={() => {
//               this._handleDrawer();
//             }}

//           />
//           <ScrollView
//             style={{ flex: 1 }}>
//             <View style={styles.container}>
//               <View
//                 style={{
//                   width: '100%',
//                   paddingHorizontal: 20,
//                   paddingBottom: 10,
//                 }}>

//                 <LabelTextInput
//                   label="Old Password"
//                   placeholder="Old Password"
//                   returnKeyType="next"
//                   required={true}
//                   secureTextEntry={true}
//                   editable={true}
//                   onChangeText={old_password => this.setState({ old_password })}
//                 />

//                 <View style={{
//                   height: '34%',
//                   alignSelf: 'center',
//                   marginVertical: 0,
//                   marginTop: 20,
//                   paddingHorizontal: 10,
//                   width: '100%',
//                   borderWidth: 2,
//                   borderColor: Colors.primary,
//                   borderRadius: 8

//                 }}>

//                   <Text style={{
//                     fontFamily: Fonts.medium,
//                     fontSize: 16,
//                     paddingVertical: 8,

//                     textAlign: 'left',
//                     color: '#1a1a1a'
//                   }}>
//                     New Password must contain the following:
// </Text>

//                   <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>

//                     <Image
//                       resizeMode={'center'}
//                       source={require('../images/close.png')}
//                       style={{ height: 15, width: 15, tintColor: Lower ? Colors.green : Colors.red }}
//                     />

//                     <Text style={{
//                       fontFamily: Fonts.regular,
//                       fontSize: 14,
//                       paddingHorizontal: 8,
//                       textAlign: 'left',
//                       color: Lower ? Colors.green : Colors.red
//                     }}>
//                       Lowercase letter
// </Text>

//                   </View>

//                   <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>

//                     <Image
//                       resizeMode={'center'}
//                       source={require('../images/close.png')}
//                       style={{ height: 15, width: 15, tintColor: Capital ? Colors.green : Colors.red }}
//                     />

//                     <Text style={{
//                       fontFamily: Fonts.regular,
//                       fontSize: 14,
//                       paddingHorizontal: 8,
//                       textAlign: 'left',
//                       color: Capital ? Colors.green : Colors.red
//                     }}>
//                       Capital (uppercase) letter
// </Text>

//                   </View>

//                   <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>

//                     <Image
//                       resizeMode={'center'}
//                       source={require('../images/close.png')}
//                       style={{ height: 15, width: 15, tintColor: Number ? Colors.green : Colors.red }}
//                     />

//                     <Text style={{
//                       fontFamily: Fonts.regular,
//                       fontSize: 14,
//                       paddingHorizontal: 8,
//                       textAlign: 'left',
//                       color: Number ? Colors.green : Colors.red
//                     }}>
//                       Number
// </Text>

//                   </View>

//                   <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>

//                     <Image
//                       resizeMode={'center'}
//                       source={require('../images/close.png')}
//                       style={{ height: 15, width: 15, tintColor: Minimum ? Colors.green : Colors.red }}
//                     />

//                     <Text style={{
//                       fontFamily: Fonts.regular,
//                       fontSize: 14,
//                       paddingHorizontal: 8,
//                       textAlign: 'left',
//                       color: Minimum ? Colors.green : Colors.red
//                     }}>
//                       Minimum 8 characters
// </Text>

//                   </View>

//                 </View>

//                 <LabelTextInput
//                   label="New Password"
//                   placeholder="New Password"
//                   returnKeyType="next"
//                   required={true}
//                   secureTextEntry={false}
//                   editable={true}
//                   onChangeText={password => {
//                     function isValid(password) {
//                       if (/[a-z]/.test(password)) {
//                         Lower = true
//                       } else {
//                         Lower = false
//                       }

//                       if (/[A-Z]/.test(password)) {
//                         Capital = true
//                       } else {
//                         Capital = false
//                       }

//                       if (/[0-9]/.test(password)) {
//                         Number = true
//                       } else {
//                         Number = false
//                       }

//                       if (password.length >= 8) {
//                         Minimum = true
//                       } else {
//                         Minimum = false
//                       }

//                       if (Lower == true && Capital == true && Number == true && Minimum == true) {
//                         ButtonVisible = true
//                       } else {
//                         ButtonVisible = false
//                       }

//                     }
//                     isValid(password)
//                     this.setState({ password })

//                   }}
//                 />

//                 <LabelTextInput
//                   label="Confirm Password"
//                   placeholder="Enter Confirm Password"
//                   returnKeyType="next"
//                   required={true}
//                   secureTextEntry={true}
//                   editable={true}
//                   onChangeText={c_password => this.setState({ c_password })}
//                 />

//                 <View style={{ alignSelf: 'center' }}>

//                   <TouchableOpacity
//                     activeOpacity={ButtonVisible ? 0.4 : 1}
//                     style={styles.btn} onPress={() => {
//                       ButtonVisible ?
//                         this.ChangePassword() : null
//                     }}>
//                     <View style={{
//                       backgroundColor: ButtonVisible ? undefined : "rgba(255, 255, 255, 0.6)", width: width * 0.8,
//                       height: width * 0.12,
//                       alignItems: 'center',
//                       //  borderWidth:1,
//                       flexDirection: 'row',
//                       justifyContent: 'center'
//                     }}>

//                       <ImageBackground
//                         resizeMode="contain"
//                         style={{ height: 40, width: 40, marginRight: 10, alignItems: 'center', justifyContent: 'center', }}
//                         source={require('../images/fill.png')}>
//                         <Image style={{ height: 20, width: 20, tintColor: Colors.primary }}
//                         resizeMode={'center'}
//                         source={require('../images/tick.png')} />
//                       </ImageBackground>
//                       <View>
//                         <Text
//                           style={{
//                             fontSize: 18,
//                             color: Colors.white,
//                             fontFamily: Fonts.medium,
//                           }}>

//                           Update
//                       </Text>
//                       </View>
//                     </View>
//                   </TouchableOpacity>

//                 </View>

//               </View>
//             </View>
//             <View style={{ height: 20 }} />

//           </ScrollView>

//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   radioButton: {
//     marginTop: 13,
//     marginLeft: 25,
//     flexDirection: 'row',
//   },
//   selectedText: {
//     fontSize: 18,
//     color: 'white',
//   },

//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//   },
//   primaryContainer: {
//     margin: 10,
//     overflow: 'hidden',
//     backgroundColor: '#f1f1f1',
//     borderColor: Colors.white,
//     borderWidth: 1,
//     borderRadius: 20,
//     shadowColor: '#f1f1f1',
//     shadowOffset: { height: 0, width: 0 },
//     shadowRadius: 5,
//     shadowOpacity: 0.8,
//     zIndex: 1,
//     flexDirection: 'column',
//   },
//   label: {
//     fontSize: 12,
//     marginTop: 3,
//     marginBottom: 1.5,
//     backgroundColor: 'transparent',
//   },
//   labelContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     paddingLeft: 10,
//     alignItems: 'center',
//     margin: 5,
//     justifyContent: 'center',
//   },
//   rowViewContainer: {
//     fontSize: 15,
//     flex: 1,
//     alignSelf: 'center',
//     paddingLeft: 10,
//     fontFamily: Fonts.medium,
//     color: Colors.dark_gray,
//   },
//   rowViewLabel: {
//     fontSize: 16,
//     width: width * 0.5,
//     paddingLeft: 5,
//     fontFamily: Fonts.medium,
//     color: Colors.primary,
//   },
//   rowDot: {
//     fontSize: 16,
//     alignSelf: 'center',
//     fontFamily: Fonts.medium,
//     color: Colors.primary,
//   },
//   rowViewHead: {
//     fontSize: 18,
//     paddingVertical: 5,
//     paddingTop: 5,
//     fontFamily: Fonts.bold,
//     color: Colors.primary,
//     paddingHorizontal: 5,
//     flex: 1,
//     paddingRight: 80,
//     paddingLeft: 10,
//     textAlign: 'left',
//   },
//   whiteImage: {
//     tintColor: Colors.white,
//     alignSelf: 'center',
//     height: 30,
//     width: 30,
//   },
//   primaryImage: {
//     tintColor: Colors.primary,
//     alignSelf: 'center',
//     height: 30,
//     width: 30,
//   },
//   absoluteView: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingRight: 30,
//     backgroundColor: 'transparent',
//   },
//   statusLabel: {
//     transform: [{ rotate: '-0deg' }],
//     overflow: 'visible',
//     width: 120,
//     minHeight: 40,
//     position: 'absolute',
//     top: 0,
//     alignSelf: 'center',
//     right: -30,
//     borderBottomLeftRadius: 20,
//     borderTopRightRadius: 20,
//     backgroundColor: Colors.white,
//   },
//   RightAbsoluteButton: {
//     overflow: 'hidden',
//     width: 120,
//     height: 60,
//     position: 'absolute',
//     bottom: -3,
//     alignSelf: 'center',
//     right: -45,
//     borderTopLeftRadius: 120,
//     borderBottomRightRadius: 120,
//     backgroundColor: Colors.primary,
//   },
//   LeftAbsoluteButton: {
//     overflow: 'visible',
//     width: 120,
//     height: 60,
//     position: 'absolute',
//     bottom: -3,
//     alignSelf: 'center',
//     left: -45,
//     borderBottomLeftRadius: 120,
//     borderTopRightRadius: 120,
//     backgroundColor: Colors.white,
//   },
//   statusLabelText: {
//     fontSize: 15,
//     textAlign: 'center',
//     fontFamily: Fonts.bold,
//     color: Colors.white,
//   },
//   textInput: {
//     marginTop: 2,
//     paddingVertical: Platform.OS == 'ios' ? 12 : 6,
//     fontSize: 16,

//     width: '85%',

//     fontFamily: Fonts.medium,
//     paddingHorizontal: 5,
//   },
//   netAlert: {
//     overflow: 'hidden',
//     borderRadius: 10,
//     shadowRadius: 10,
//     width: width * 0.8,
//     minHeight: height * 0.3,
//     borderColor: '#f1f1f1',
//     borderWidth: 1,
//     backgroundColor: Colors.white,
//   },
//   netAlertContent: {
//     flex: 1,
//     padding: 20,
//   },
//   label: {
//     marginTop: 10,
//     color: Colors.primary,
//     fontSize: 14,
//     paddingVertical: 3,
//     fontFamily: Fonts.medium,
//   },

//   label: {
//     marginTop: 10,
//     color: Colors.primary,
//     fontSize: 14,
//     paddingVertical: 3,
//     fontFamily: Fonts.medium,
//   },
//   required: {
//     marginTop: 10,
//     color: 'red',
//     fontSize: 14,
//     paddingLeft: 3,
//     paddingVertical: 3,
//     fontFamily: Fonts.medium,
//   },
//   TextStyle: {

//   },
//   btn: {

//     flexDirection: 'row',
//     width: width * 0.8,
//     height: width * 0.12,
//     alignItems: 'center',
//     //  borderWidth:1,
//     justifyContent: 'center',
//     borderRadius: 4,
//     backgroundColor: Colors.primary,
//     marginVertical: 30,
//   },
// });
