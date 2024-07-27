import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Messages from '../../screens/Messages/Message';
import DrawerMenuItem from '../DrawerMenu/DrawerMenuItem';
import {
  About,
  Blog,
  ContactUs,
  Dictionary,
  Home,
  Policy,
  Quiz,
  Translator,
} from '../Route';
const Drawer = createDrawerNavigator();
export default function DrawerScreen() {
  return (
    <Drawer.Navigator
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={{
        backgroundColor: '#252b3b',
        width: '80%',
        elevation: 1,
      }}
      initialRouteName="Home"
      drawerContent={props => <DrawerMenuItem {...props} />}>
      <Drawer.Screen
        name={'Home'}
        component={Home}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={'Translator'}
        component={Translator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={'Dictionary'}
        component={Dictionary}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={'Quiz'}
        component={Quiz}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={'Blog'}
        component={Blog}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={'Personal Assistant'}
        component={Messages}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={'About'}
        component={About}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={'Policy'}
        component={Policy}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={'ContactUs'}
        component={ContactUs}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
