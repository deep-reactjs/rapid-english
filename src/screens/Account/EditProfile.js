import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  AppRoot,
  Header,
  TextInput,
  ScrollableAvoidKeyboard,
  Button,
  Snackbar,
  Loader,
} from '../../component';
import {
  Colors,
  Fonts,
  Strings,
  Screen,
  Dimens,
  ImageView,
  Storage_Key,
  Constants,
} from '../../config/appConstants';
import c from '../../styles/commonStyle';
import Icon from 'react-native-vector-icons/Fontisto';
import SwipeUpDownModal from '../../component/BottomSheet';
import ImagePicker from 'react-native-image-crop-picker';
import { Helper, PrefManager } from '../../utils';
import { connect } from 'react-redux';
import {
  accountActions,
  accountUpdateActions,
  accountDataClear,AccountUpdateClear
} from '../../redux/actions/accountActions';
import { InterstitialAd, TestIds } from '@react-native-admob/admob';
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
});
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      name: '',
      nameError: '',
      mobile: '',
      mobileError: '',
      profile: null,
      base: null,
      modalVisible: false,
      flag: false,
      flag1: false,
      InterstitialAd: InterstitialAd.createAd(Constants.REWARDED)
    };
    this.isName = React.createRef();
    this.isMobile = React.createRef();
    this.isEmail = React.createRef();
    props.navigation.addListener('focus', async () => {
      PrefManager.getValue(Storage_Key.id).then(id => {
        props.accountActions({ id: id });
        this.setState({
          flag: false,
          flag1: false
        })
      });
    });
    props.navigation.addListener('focus', async () => {
      try {
          this.state.InterstitialAd.show()
      } catch (error) {
        console.log('error', error);
      }
    });
  }
  componentDidMount() {
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.profileData.data && props.profileData.status && !state.flag) {
      return {
        email: props.profileData.data.email,
        profile: props.profileData.file_url + props.profileData.data.profile,
        name: props.profileData.data.name,
        mobile: props.profileData.data.mobile,
        flag: true,
      };
    }
    if (Object.keys(props.editProfile).length !== 0 && props.editProfile.status && !state.flag1) {
      return {
        flag1: true,
      };
    }
  }

  componentDidUpdate(prevProps) {
    const { navigation, editProfile, AccountUpdateClear } = this.props;
    console.log(editProfile,'editProfile');
    if (Object.keys(editProfile).length !== 0 && editProfile.status) {
      setTimeout(() => {
        PrefManager.setValue(Storage_Key.name, this.state.name);
        PrefManager.setValue(Storage_Key.phone, this.state.mobile);
        PrefManager.setValue(Storage_Key.email, this.state.email);
        PrefManager.setValue(Storage_Key.profile,editProfile.file_url+  editProfile.data.profile);
        AccountUpdateClear();
        navigation.goBack();
      }, 80);
    }
  }

  render() {
    const { navigation, loading } = this.props;
    const {
      base,
      profile,
      email,
      emailError,
      name,
      nameError,
      mobile,
      mobileError,
    } = this.state;
    return (
      <AppRoot>
        <View style={c.flexStyle}>

          <Header
            text={'Edit Profile'}
            onBack={() => navigation.goBack()}
            onLogout={() => navigation.navigate('Signin')}
          />
          <ScrollableAvoidKeyboard
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <View style={styles.flexBox}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }}
                style={styles.profileButton}>
                {base == null ? (
                  <Image
                    source={profile ? { uri: profile } : ImageView.noImage}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 65,
                      backgroundColor: Colors.light_gray,
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={{ uri: 'data:image/png;base64,' + base }}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 65,
                      backgroundColor: Colors.light_gray,
                    }}
                    resizeMode="cover"
                  />
                )}
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalVisible: !this.state.modalVisible });
                  }}
                  style={styles.camStyles}>
                  <Icon name="camera" size={16} color={Colors.white} />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            <TextInput
              fontBold
              value={email}
              errorText={emailError}
              title={Strings.email}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={text =>
                this.setState({ email: text, emailError: '' })
              }
              keyboardType={'email-address'}
              placeholder={Strings.email}
              containerStyle={c.profileInput}
              ref={input => (this.isEmail = input)}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.isName.getInnerRef().focus();
              }}
            />
            <TextInput
              fontBold
              value={name}
              errorText={nameError}
              onChangeText={text => this.setState({ name: text, nameError: '' })}
              title={Strings.name}
              placeholderTextColor={Colors.dark_gray}
              keyboardType={'default'}
              placeholder={Strings.name}
              containerStyle={c.profileInput}
              ref={input => {
                this.isName = input;
              }}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.isMobile.getInnerRef().focus();
              }}
            />
            <TextInput
              fontBold
              value={mobile}
              errorText={mobileError}
              onChangeText={text =>
                this.setState({ mobile: text, mobileError: '' })
              }
              title={Strings.Phone}
              placeholderTextColor={Colors.dark_gray}
              keyboardType={'number-pad'}
              placeholder={Strings.Phone}
              containerStyle={c.profileInput}
              ref={input => {
                this.isMobile = input;
              }}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.validation();
              }}
            />

            <View style={{ height: 100 }} />
          </ScrollableAvoidKeyboard>
          <Button
            text={'Update'}
            visible={loading}
            containerStyle={[c.Button, { marginBottom: Screen.hp(2.5) }]}
            onPress={() => this.validation()}
          />
          <SwipeUpDownModal
            modalVisible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false });
            }}
            ContentModal={
              <View style={{ flex: 1 }}>
                <View style={c.draggableIcon} />
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: Screen.wp('14%'),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.camera();
                    }}>
                    <Image
                      resizeMode={'contain'}
                      style={{ height: 60, width: 60 }}
                      source={ImageView.camera}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.gallary();
                    }}>
                    <Image
                      resizeMode={'contain'}
                      style={{ height: 69, width: 60 }}
                      source={ImageView.gallery}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }
            ContentModalStyle={c.contentModalStyle}
            onClose={() => {
              this.setState({ modalVisible: false });
            }}
          />
        </View>
      </AppRoot>
    );
  }
  validation = async () => {
    const { name, email, mobile, base } = this.state;
    if (!name) {
      Snackbar('Enter your Name', Strings.close);
      return;
    }
    if (!email) {
      Snackbar(Strings.eEmail, Strings.close);
      return;
    }
    if (!Helper.isValideEmail(email)) {
      Snackbar(Strings.eEmail, Strings.close);
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
    let id = await PrefManager.getValue(Storage_Key.id);
    let request = {
      id: id,
      name: name,
      email: email,
      mobile: mobile,
      profile: base,
      address: '1',
    };
    this.props.accountUpdateActions(request);
  };

  camera() {
    ImagePicker.openCamera({
      multiple: false,
      includeBase64: true,
      includeExif: true,
      maxFiles: 1,
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.9,
      mediaType: 'photo',
    })
      .then(images => {
        console.log('Temp data', images);
        this.setState({
          base: images.data,
        });
        this.setState({
          modalVisible: false,
        });
      })
      .catch(e => {
        console.log('e', e);
        this.setState({
          modalVisible: false,
        });
      });
  }

  gallary() {
    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      includeExif: true,
      maxFiles: 1,
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.9,
      mediaType: 'photo',
    })
      .then(images => {
        console.log('Temp data', images);
        this.setState({
          base: images.data,
        });
        this.setState({
          modalVisible: false,
        });
      })
      .catch(e => {
        this.setState({
          modalVisible: false,
        });
      });
  }
}
const mapStateToProps = state => {
  return {
    profileData: state.account.profileData,
    editProfile: state.account.editProfile,
    loading: state.account.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    accountActions: data => {
      dispatch(accountActions(data));
    },
    accountUpdateActions: data => {
      dispatch(accountUpdateActions(data));
    },
    accountDataClear: data => {
      dispatch(accountDataClear(data));
    },
    AccountUpdateClear: data => {
      dispatch(AccountUpdateClear(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
