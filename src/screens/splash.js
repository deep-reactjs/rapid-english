import {CommonActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  Image,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {AppRoot} from '../component';
import {
  Colors,
  Dimens,
  Fonts,
  ImageView,
  Screen,
  Storage_Key,
} from '../config/appConstants';
import {Home, Login} from '../navigation/NavigationHelper';
import {appVersion} from '../redux/actions/splashActions';
import {PrefManager} from '../utils';
const styles = StyleSheet.create({
  imgStyle: {
    height: Screen.hp('28%'),
    alignSelf: 'center',
    width: Screen.wp('60%'),
  },
  ModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  netAlert: {
    overflow: 'hidden',
    borderRadius: 10,
    shadowRadius: 10,
    width: Screen.width,
    height: Screen.height,
    borderColor: '#f1f1f1',
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  netAlertContent: {
    flex: 1,
    padding: 20,
  },
  netAlertTitle: {
    fontSize: Dimens.F20,
    paddingTop: 20,
    color: Colors.primary,
    textAlign: 'center',
    fontFamily: Fonts.Bold,
  },
  netAlertDesc: {
    fontSize: Dimens.F16,
    paddingTop: 10,
    alignSelf: 'center',
    width: Screen.width * 0.8,
    color: Colors.primaryDark,
    fontFamily: Fonts.SemiBold,
    paddingVertical: 5,
    textAlign: 'center',
  },
});
const android_version = '7.0';
const ios_version = '4.0';
var androidurl = '';
var iosurl = '';
class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: false,
      txt: '',
      data: '',
      flag: false,
      Appversion: true,
    };
    this.props.appVersion();
  }

  componentDidMount() {
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  componentDidUpdate(prevProps) {
    const {data} = this.props;
    if (data.status) {
      androidurl = data.data.android_url;
      iosurl = data.data.ios_url;
      if (data.data.maintenance == 1) {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Maintenance',
                params: {txt: this.state.txt},
              },
            ],
          }),
        );
      } else {
        PrefManager.setValue(
          Storage_Key.app,
          JSON.stringify(data.data.app ? data.data.app : 0),
        );
        PrefManager.setValue(
          Storage_Key.app1,
          JSON.stringify(data.data.app1 ? data.data.app1 : 1),
        );
        if (Platform.OS == 'android') {
          if (android_version == data.data.android_version) {
            PrefManager.getValue(Storage_Key.id).then(id => {
              if (id) {
                this.props.navigation.dispatch(Home);
              } else {
                this.props.navigation.dispatch(Login);
              }
            });
          }
        } else {
          if (ios_version == data.data.ios_version) {
            PrefManager.getValue(Storage_Key.id).then(id => {
              if (id) {
                this.props.navigation.dispatch(Home);
              } else {
                this.props.navigation.dispatch(Login);
              }
            });
          }
        }
      }
    } else {
      PrefManager.getValue(Storage_Key.id).then(id => {
        if (id) {
          this.props.navigation.dispatch(Home);
        } else {
          this.props.navigation.dispatch(Login);
        }
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.data.length !== 0 &&
      props?.data?.flag !== state?.flag &&
      state.Appversion
    ) {
      return {
        modalVisible: (
          Platform.OS == 'ios'
            ? ios_version === props.data.data.ios_version
            : android_version === props.data.data.android_version
        )
          ? false
          : true,
        flag: true,
        Appversion: false,
      };
    } else {
      return null;
    }
  }

  render() {
    console.log('res', this.props);
    const {} = this.props;
    return (
      <AppRoot>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.white,
          }}>
          <Image
            resizeMode={'contain'}
            source={ImageView.logo}
            style={styles.imgStyle}
          />
        </View>
        <Modal
          ref={'updateModal'}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          visible={this.state.modalVisible}
          position="bottom"
          backdrop={true}
          coverScreen={true}
          backdropPressToClose={false}
          backdropOpacity={0.5}
          transparent={true}
          swipeToClose={false}>
          <AppRoot>
            <View style={styles.ModalContainer}>
              <View style={styles.netAlert}>
                <View style={styles.netAlertContent}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginTop: 10,
                    }}>
                    <Image
                      resizeMode="cover"
                      source={ImageView.update}
                      style={{width: Screen.width, height: Screen.width}}
                    />
                  </View>
                  <Text style={styles.netAlertTitle}>Update Required</Text>
                  <Text style={styles.netAlertDesc}>
                    Please update our app for an improved experience!! This
                    version is no longer supported.
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: Colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    bottom: 14,
                  }}
                  onPress={() => this.get()}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: Dimens.F18,
                      fontFamily: Fonts.SemiBold,
                    }}>
                    Upgrade Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </AppRoot>
        </Modal>
      </AppRoot>
    );
  }
  get = () => {
    if (Platform.OS == 'android') {
      console.log(androidurl);
      Linking.openURL(androidurl);
    } else if (Platform.OS == 'ios') {
      console.log(iosurl);
      Linking.openURL(iosurl);
    }
  };
}
const mapStateToProps = state => {
  console.log(state.splash.data);
  return {
    data: state.splash.data,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  appVersion,
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
