import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {
//   Splash,
//   Signin,
//   FPassword,
//   Signup,
//   OtpVerify,
//   Maintenance,
//   ForgotPassword,
//   Notification,
//   Profile,
//   EditProfile,
//   Translator,
//   Dictionary,
//   Quiz,
//   Blog,
//   About,
//   Policy,
//   ContactUs,
//   BlogView,
//   Score
// } from './Route';
import Splash from "../screens/splash";
import Signin from "../screens/Auth/signIn";
import FPassword from "../screens/Auth/fPassword";
import Signup from "../screens/Auth/signUp";
import OtpVerify from "../screens/Auth/otpVerify";
import Maintenance from "../screens/Auth/maintenance";
import ForgotPassword from "../screens/Setting/forgotPassword";
import Notification from "../screens/Notification";
import Home from "../screens/Home";
import Translator from "../screens/Translator";
import Dictionary from "../screens/Dictionary";
import Quiz from "../screens/Quiz";
import Blog from "../screens/Blog";
import BlogView from "../screens/Blog/BlogView";
import About from "../screens/Setting/aboutUs";
import Policy from "../screens/Setting/policy";
import ContactUs from "../screens/Setting/contactUs";
import Profile from "../screens/Account";
import Score from "../screens/Account/score";
import EditProfile from "../screens/Account/EditProfile";
import Drawer from './DrawerMenu/DrawerMenu';
import { Provider } from 'react-redux';
import {PrefManager} from '../utils';
import { AppOpenAdProvider, TestIds } from '@react-native-admob/admob';
import configureStore from '../redux/configureStore';
import { Storage_Key } from "../config/appConstants";
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const Stack = createNativeStackNavigator();
const Store = configureStore();
const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Splash"
      component={Splash}
      navigationOptions={{ headerShown: false, header: false }}
    />
    <Stack.Screen name={'Maintenance'} component={Maintenance} />
    <Stack.Screen name={'Signin'} component={Signin} />
    <Stack.Screen name={'Signup'} component={Signup} />
    <Stack.Screen name={'FPassword'} component={FPassword} />

    <Stack.Screen name={'OtpVerify'} component={OtpVerify} />
    <Stack.Screen
      name={'Home'}
      component={Drawer}
      navigationOptions={{ headerShown: false, header: false }}
    />
    <Stack.Screen
      name={'Translator'}
      component={Translator}
      navigationOptions={{ headerShown: false, header: false }}
      options={{ animation: 'slide_from_bottom' }}
    />
    <Stack.Screen
      name={'Dictionary'}
      component={Dictionary}
      navigationOptions={{ headerShown: false, header: false }}
      options={{ animation: 'slide_from_bottom' }}
    />
    <Stack.Screen
      name={'Quiz'}
      component={Quiz}
      navigationOptions={{ headerShown: false, header: false }}
      options={{ animation: 'slide_from_bottom' }}
    />
    <Stack.Screen
      name={'Blog'}
      component={Blog}
      navigationOptions={{ headerShown: false, header: false }}
      options={{ animation: 'slide_from_bottom' }}
    />
    <Stack.Screen
      name={'BlogView'}
      component={BlogView}
      navigationOptions={{ headerShown: false, header: false }}
      options={{ animation: 'slide_from_bottom' }}
    />
    <Stack.Screen
      name={'ContactUs'}
      component={ContactUs}
      navigationOptions={{ headerShown: false, header: false }}
      options={{ animation: 'slide_from_bottom' }}
    />
    <Stack.Screen
      name={'About'}
      component={About}
      navigationOptions={{ headerShown: false, header: false }}
      options={{ animation: 'slide_from_bottom' }}
    />
    <Stack.Screen
      name={'Policy'}
      component={Policy}
      navigationOptions={{ headerShown: false, header: false }}
      options={{ animation: 'slide_from_bottom' }}
    />
    <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
    <Stack.Screen name={'Notification'} component={Notification} />
    <Stack.Screen name={'Profile'} component={Profile} />
    <Stack.Screen name={'EditProfile'} component={EditProfile} />
    <Stack.Screen
      name={'Score'}
      component={Score}
      navigationOptions={{ headerShown: false, header: false }}
      options={{ animation: 'slide_from_bottom' }}
    />
  </Stack.Navigator>
);
const App = () => {
  const [id, setId] = useState('');
  useEffect(() => {
    PrefManager.getValue(Storage_Key.id).then(id=>{
      setId(id)
    })
  }, [id]);

  return (
    <NavigationContainer>
      <Provider store={Store}>
        {/* <AppOpenAdProvider
          unitId={TestIds.APP_OPEN}
          options={{ showOnColdStart: id?true:false,showOnAppForeground : id?true:false }}
        > */}
          <AuthNavigator />
        {/* </AppOpenAdProvider> */}
      </Provider>
    </NavigationContainer>
  )
}
export default App;
