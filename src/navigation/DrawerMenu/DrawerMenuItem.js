import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {AppRoot, Snackbar} from '../../component';
import {
  Colors,
  Dimens,
  Fonts,
  ImageView,
  Storage_Key,
  Strings,
} from '../../config/appConstants';
import {onLogout} from '../../redux/actions/authActions';
import {Post} from '../../services/api.service';
import {PrefManager} from '../../utils';
import {DELETE} from '../../utils/HttpService';
import {MenuList} from './MenuList';
const s = StyleSheet.create({
  top: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  round: {
    backgroundColor: Colors.drawerSecond,
    borderWidth: 1,
    borderColor: Colors.white,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
  roundText: {
    fontFamily: Fonts.Regular,
    color: Colors.white,
    fontSize: Dimens.F40,
  },
  name: {
    fontFamily: Fonts.Regular,
    fontSize: Dimens.F20,
    color: Colors.white,
    left: 8,
  },
  text: {
    fontFamily: Fonts.Regular,
    fontSize: Dimens.F16,
    color: Colors.white,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 5,
  },
  icon: {
    height: 28,
    width: 28,
  },
  title: {
    fontFamily: Fonts.Regular,
    marginLeft: 10,
    fontSize: Dimens.F16,
    color: Colors.dark_gray,
  },
  heading: {
    fontFamily: Fonts.Regular,
    color: Colors.medium_gray,
    fontSize: Dimens.F14,
    marginVertical: 10,
  },
});

const DrawerMenuItem = ({navigation}) => {
  const [name, setName] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [i, setIndex] = useState(0);
  const dispatch = useDispatch();
  const logoutData = data => dispatch(onLogout(data));

  useEffect(() => {
    PrefManager.getValue(Storage_Key.name).then(name => {
      setName(name);
    });
  }, [navigation]);
  const isLogout = async () => {
    setRefresh(!refresh);
    PrefManager.removeValue(Storage_Key.id);
    PrefManager.removeValue(Storage_Key.email);
    PrefManager.removeValue(Storage_Key.name);
    PrefManager.removeValue(Storage_Key.profile);
    PrefManager.removeValue(Storage_Key.phone);
    logoutData();
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Signin'}],
        }),
      );
    }, 500);
    try {
      await GoogleSignin.signOut();
    } catch (error) {}
  };
  const DeleteAccount = async () => {
    let id = await PrefManager.getValue(Storage_Key.id);
    let request = {
      id: id,
    };
    Post(DELETE, request).then(
      result => {
        if (result.status) {
          isLogout();
        } else {
          Snackbar(result.data.message, Strings.close);
          dispatch(AccountUpdateFail(result));
        }
      },
      error => {
        Snackbar(
          error ? error.toString() : 'Something went wrong',
          Strings.close,
        );
      },
    );
  };
  return (
    <AppRoot>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          colors={[Colors.primary, Colors.secondary]}
          style={s.top}>
          <View style={s.round}>
            <Text style={s.roundText}>{name ? name.charAt(0) : ''}</Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={s.name}>{name}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{
                height: 30,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={[s.icon, {tintColor: 'white', right: 6}]}
                source={ImageView.edit}></Image>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={{flex: 1, backgroundColor: Colors.white, padding: 10}}>
          <FlatList
            data={MenuList}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={s.item}
                onPress={() => {
                  if (item.name == 'Logout') {
                    Alert.alert('Logout', 'Are you sure you want to Logout', [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {text: 'Yes', onPress: () => isLogout()},
                    ]);
                  } else if (item.name == 'Delete Account') {
                    Alert.alert(
                      'Delete My Account',
                      'Are you sure you want to delete your account',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'Yes', onPress: () => DeleteAccount()},
                      ],
                    );
                  } else {
                    navigation.navigate(item.navigation);
                    navigation.closeDrawer();
                    setIndex(index);
                  }
                }}>
                <Image style={s.icon} source={item.icon} />
                <Text
                  style={[
                    s.title,
                    {
                      fontFamily: i == index ? Fonts.SemiBold : Fonts.Regular,
                      color: i == index ? Colors.primary : Colors.dark_gray,
                    },
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </AppRoot>
  );
};
export default DrawerMenuItem;
