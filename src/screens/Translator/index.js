import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity, Keyboard } from 'react-native';
import { Languages } from '../../utils';
import c from '../../styles/commonStyle';
import {
  AppRoot,
  Header,
  Snackbar,
  Button,
  RadioButton,
  SheetPicker,
  Ad,
} from '../../component';
import {
  Colors,
  Fonts,
  Strings,
  Screen,
  Dimens,
  ImageView,
  Constants,
} from '../../config/appConstants';
import { Google } from '../../utils/HttpService';
import { connect } from 'react-redux';
import { InterstitialAd, TestIds } from '@react-native-admob/admob';
const s = StyleSheet.create({
  picker: {
    width: '80%'
  },
  container: {
    paddingTop: 0,
    flex: 1
  },
  inputStyle: {
    width: '100%',
    height: Screen.hp(20),
    backgroundColor: 'white',
    textAlignVertical: 'top',
    paddingHorizontal: Screen.wp(4),
    fontSize: Dimens.F20,
    color: Colors.secondary,
    fontFamily: Fonts.Regular,
  },
  flexStyle: {
    marginLeft: 5,
    backgroundColor: Colors.light_gray,
    width: '40%',
    paddingHorizontal: 16,
    height: 46,
    alignItems: 'center',
    flexDirection: 'row', justifyContent: 'space-between',
    borderRadius: Screen.wp(5),
  },
  imgStyle: {
    height: 12,
    width: 12,
    tintColor: Colors.dark_gray,
  }
});
class Translator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker1: false,
      showPicker2: false,
      languageFrom: 'hi',
      languageTo: 'en',
      inputText: '',
      outputText: '',
      loading: false
    };

    props.navigation.addListener('focus', () => {
      try {
        const interstitial = InterstitialAd.createAd(Constants.INTERSTITIAL__KEY);
        this.time = setTimeout(() => {
          interstitial.show()
        }, 10000);

      } catch (error) {
        console.log('error', error);
      }
    })
    props.navigation.addListener('blur', () => {
      clearTimeout(this.time)
    })
  }
  TranslateText = () => {
    let lang_code = this.state.languageFrom;
    let fromLang = this.state.languageTo;
    let toLang = lang_code;
    let text = this.state.inputText;
    let url = Google + '?key=' + Constants.GOOGLE_T_API_KEY;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;
    console.log('url is ', url);
    this.setState({ loading: true });
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(response => {
        console.log('response from google: ', response);
        this.setState({
          loading: false,
          outputText: response.data.translations[0].translatedText,
        });
      })
      .catch(error => {
        console.log('There was an error with the translation request: ', error);
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  swipe = () => {
    let a = this.state.languageTo
    let b = this.state.languageFrom
    let i = this.state.inputText
    let o = this.state.outputText

    this.setState({
      languageTo: b,
      languageFrom: a,
      inputText: o,
      outputText: i
    })
  }
  handleKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      Keyboard.dismiss();
    }
  }
  render() {
    const { navigation } = this.props;
    const { languageFrom, languageTo, inputText, showPicker1, showPicker2 } = this.state;
    return (
      <AppRoot>
        <Header
          text={' '}
          onBack={() => navigation.goBack()}
          notification={() => navigation.navigate('Notification')}
        />
        <View style={s.container}>
          {languageTo ? (
            languageTo != 'auto' ? (
              <View style={{ backgroundColor: 'white' }}>
                <Text
                  style={[
                    c.textNormal,
                    { paddingHorizontal: Screen.wp(3.5), fontSize: Dimens.F20 },
                  ]}>
                  {Languages[languageTo]}
                </Text>
              </View>
            ) : null
          ) : null}
          <TextInput
            multiline={true}
            style={s.inputStyle}
            placeholder="Enter text"
            placeholderTextColor={Colors.secondary}
            selectionColor={Colors.secondary}
            underlineColorAndroid="transparent"
            onChangeText={inputText =>
              this.setState({ inputText }, () => {
                if (this.state.inputText.length > 3) {
                  // alert('Request block from developer side');
                }
              })
            }
            value={this.state.inputText}
            autoCapitalize="sentences"
            autoCorrect={true}
            onKeyPress={this.handleKeyDown}
          />
          <View style={{ marginTop: Screen.hp(0.4) }}></View>
          {/* {inputText.length > 3 ? ( */}
          <>
            {languageFrom ? (
              languageFrom != 'auto' ? (
                <View style={{ backgroundColor: 'white' }}>
                  <Text
                    style={[
                      c.textNormal,
                      {
                        paddingHorizontal: Screen.wp(3.5),
                        marginTop: Screen.hp(1),
                        fontSize: Dimens.F20,
                      },
                    ]}>
                    {Languages[languageFrom]}
                  </Text>
                </View>
              ) : null
            ) : null}
          </>
          {/* ) : null} */}

          <TextInput
            style={s.inputStyle}
            value={this.state.outputText}
            editable={false}
            multiline={true}
          />

          {/* <Text style={c.textNormal}>{this.state.outputText}</Text> */}

          <View style={[c.flexRow, { alignSelf: 'center', paddingTop: Screen.hp(2) }]}>
            <View
              style={s.flexStyle}>
              <TouchableOpacity
                onPress={() => this.setState({ showPicker1: true })}
                style={s.picker}>
                <Text
                  style={[c.textNormal, { textAlign: 'left', width: '100%' }]}>
                  {Languages[languageTo]}
                </Text>

              </TouchableOpacity>

              <Image
                source={ImageView.down_arrow}
                resizeMode="contain"
                style={s.imgStyle}
              />

            </View>
            <TouchableOpacity
              onPress={() => this.swipe()}>

              <Image
                source={ImageView.repeat}
                style={{
                  height: 25,
                  width: 25,
                  marginHorizontal: 8,
                  tintColor: Colors.secondary,
                }}
              />
            </TouchableOpacity>


            <View style={s.flexStyle}>
              {/* <Picker
                style={{ width: '100%', marginLeft: 8 }}
                selectedValue={this.state.languageFrom}
                onValueChange={lang => this.setState({ languageFrom: lang })}>
                {Object.keys(Languages).map(key => (
                  <Picker.Item label={Languages[key]} value={key} />
                ))}
              </Picker> */}

              <TouchableOpacity
                onPress={() => this.setState({ showPicker2: true })}
                style={s.picker}>
                <Text
                  style={[c.textNormal, { textAlign: 'left', width: '100%' }]}>
                  {Languages[languageFrom]}
                </Text>

              </TouchableOpacity>
              <Image
                source={ImageView.down_arrow}
                resizeMode="contain"
                style={s.imgStyle}
              />
            </View>
          </View>

          <Button
            visible={this.state.loading}
            text={"Translate"}
            containerStyle={[c.Button, { marginBottom: Screen.hp(2.5) }]}
            onPress={() => { 
              // if (this.state.languageTo == '' || this.state.languageTo == 'auto' ) {
              //   Snackbar('Select language', Strings.close)
              // }
              // else if (this.state.inputText == '') {
              //   Snackbar('Enter something', Strings.close)
              // }
              // else{
              //   // this.TranslateText()
              //   alert('Request block from developer side')
              // }
                this.TranslateText()
             }}
          />
        </View>

        <SheetPicker
          open={showPicker1}
          data={Languages}
          selectedValue={languageFrom}
          onValueChange={e => {
            this.setState({ languageTo: e, showPicker1: false });
          }}
          onClose={() => {
            this.setState({ showPicker1: false });
          }}
        />
        <SheetPicker
          open={showPicker2}
          data={Languages}
          selectedValue={languageFrom}
          onValueChange={e => {
            this.setState({ languageFrom: e, showPicker2: false }, () => {
              this.TranslateText()
            });

          }}
          onClose={() => {
            this.setState({ showPicker2: false }, () => {
              this.TranslateText()
            });
          }}
        />
        <Ad adTypes={'Banner'} />
      </AppRoot>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Translator);