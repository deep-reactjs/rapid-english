import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {AppRoot, Header, Snackbar, Loader, Ad} from '../../component';
import {
  Screen,
  Colors,
  Fonts,
  ImageView,
  Dimens,
  Strings,
  Storage_Key,
} from '../../config/appConstants';
import {PrefManager} from '../../utils';
import {connect} from 'react-redux';
import {contactUs} from '../../redux/actions/contentActions';
class Contact extends Component {
  constructor(props) {
    super(props);
    this.props.contactUs({type: 'contact-us'});
  }

  componentDidMount() {
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  render() {
    const {navigation, loading, dataSource} = this.props;
    console.log(dataSource);
    return (
      <AppRoot>
        <Loader loading={loading} />
        <Header
          onBack={() => this.props.navigation.goBack()}
          text="Contact us"
        />
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: Fonts.SemiBold,
              textAlign: 'center',
              paddingVertical: 14,
              fontSize: Dimens.SizeMedium,
            }}>
            {'Need Help?'}
          </Text>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 10,
              alignSelf: 'center',
              elevation: 1,
              width: '95%',
              backgroundColor: 'white',
            }}>
            {/* <View
            style={{
              flexDirection: 'row',
              width: '90%',
              borderBottomWidth: 1,
              borderBottomColor: Colors.light_gray,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Image
              source={ImageView.phone}
              resizeMode={'center'}
              style={{width: 20, height: 20, marginTop: 8}}
            />
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                paddingVertical: 2,
                paddingHorizontal: 10,
                width: '100%',
              }}
              onPress={() => {
                this.Phone(dataSource  && dataSource.detail[0]);
              }}>
              <Text
                style={{
                  fontSize: Dimens.SizeMedium,
                  color: Colors.black,
                  fontFamily: Fonts.Bold,
                }}>
                {Strings.callus}
              </Text>
              <Text
                style={{
                  fontSize: Dimens.Small,
                  color: Colors.dark_gray,
                  fontFamily: Fonts.Regular,
                }}>
                {'+91' + `${dataSource  && dataSource.detail[0]}  `}
              </Text>
            </TouchableOpacity>
          </View> */}

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: Colors.light_gray,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Image
                source={ImageView.gmail}
                resizeMode={'center'}
                style={{width: 20, height: 20, marginTop: 8}}
              />
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                onPress={() => {
                  this.Email(dataSource && dataSource.detail[1]);
                }}>
                <Text
                  style={{
                    fontSize: Dimens.SizeMedium,
                    color: Colors.black,
                    fontFamily: Fonts.Bold,
                  }}>
                  {Strings.emailus}
                </Text>
                <Text
                  style={{
                    fontSize: Dimens.Small,
                    color: Colors.link,
                    fontFamily: Fonts.Regular,
                  }}>
                  {dataSource && dataSource.detail[1]}
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View
            style={{
              flexDirection: 'row',
              width: '90%',
              borderBottomWidth: 1,
              borderBottomColor: Colors.light_gray,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Image
              source={ImageView.wp}
              resizeMode={'center'}
              style={{width: 20, height: 20, marginTop: 8}}
            />
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                paddingVertical: 2,
                paddingHorizontal: 10,
                width: '100%',
              }}
              onPress={() => {
                Linking.openURL(
                  `whatsapp://send?text=&phone=+91${dataSource  && dataSource.detail[2]}`,
                );
              }}>
              <Text
                style={{
                  fontSize: Dimens.SizeMedium,
                  color: Colors.black,
                  fontFamily: Fonts.Bold,
                }}>
                {Strings.chatus}
              </Text>
              <Text
                style={{
                  fontSize: Dimens.Small,
                  color: Colors.dark_gray,
                  fontFamily: Fonts.Regular,
                }}>
                {"Let's connect"}
              </Text>
            </TouchableOpacity>
          </View> */}

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: Colors.light_gray,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Image
                source={ImageView.instagram}
                resizeMode={'center'}
                style={{width: 20, height: 20, marginTop: 8}}
              />
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                onPress={() => {
                  // this.Email(dataSource  && dataSource.detail[1]);
                  Linking.openURL(dataSource.detail[4]);
                }}>
                <Text
                  style={{
                    fontSize: Dimens.SizeMedium,
                    color: Colors.black,
                    fontFamily: Fonts.Bold,
                  }}>
                  {Strings.inst}
                </Text>
                <Text
                  style={{
                    fontSize: Dimens.Small,
                    color: Colors.link,
                    fontFamily: Fonts.Regular,
                  }}>
                  {dataSource && dataSource.detail[4]}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: Colors.light_gray,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Image
                source={ImageView.twitter}
                resizeMode={'center'}
                style={{width: 20, height: 20, marginTop: 8}}
              />
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                onPress={() => {
                  Linking.openURL(dataSource.detail[5]);
                }}>
                <Text
                  style={{
                    fontSize: Dimens.SizeMedium,
                    color: Colors.black,
                    fontFamily: Fonts.Bold,
                  }}>
                  {Strings.tw}
                </Text>
                <Text
                  style={{
                    fontSize: Dimens.Small,
                    color: Colors.link,
                    fontFamily: Fonts.Regular,
                  }}>
                  {dataSource && dataSource.detail[5]}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: Colors.light_gray,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Image
                source={ImageView.youtube}
                resizeMode={'center'}
                style={{width: 20, height: 20, marginTop: 8}}
              />
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                onPress={() => {
                  Linking.openURL(dataSource.detail[6]);
                }}>
                <Text
                  style={{
                    fontSize: Dimens.SizeMedium,
                    color: Colors.black,
                    fontFamily: Fonts.Bold,
                  }}>
                  {Strings.yt}
                </Text>
                <Text
                  style={{
                    fontSize: Dimens.Small,
                    color: Colors.link,
                    fontFamily: Fonts.Regular,
                  }}>
                  {dataSource && dataSource.detail[6]}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: Colors.light_gray,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Image
                source={ImageView.telegram}
                resizeMode={'center'}
                style={{width: 20, height: 20, marginTop: 8}}
              />
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  paddingVertical: 2,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                onPress={() => {
                  Linking.openURL(dataSource.detail[7]);
                }}>
                <Text
                  style={{
                    fontSize: Dimens.SizeMedium,
                    color: Colors.black,
                    fontFamily: Fonts.Bold,
                  }}>
                  {Strings.tele}
                </Text>
                <Text
                  style={{
                    fontSize: Dimens.Small,
                    color: Colors.link,
                    fontFamily: Fonts.Regular,
                  }}>
                  {dataSource && dataSource.detail[7]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Ad adTypes={'Banner'} />
      </AppRoot>
    );
  }
  Phone = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  Email = email => {
    Linking.openURL(`mailto:${email}`);
  };
}
const mapStateToProps = state => {
  return {
    dataSource: state.content.contactData.data,
    loading: state.content.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    contactUs: data => {
      dispatch(contactUs(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
