import { InterstitialAd } from '@react-native-admob/admob';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Sound from "react-native-sound";
import { connect } from 'react-redux';
import { Ad, AppRoot, Header, Loader, Snackbar, TextInput } from '../../component';
import {
  Colors,
  Constants,
  Dimens,
  Fonts,
  ImageView,
  Screen,
  Strings,
} from '../../config/appConstants';
import c from '../../styles/commonStyle';
import { DictionaryApi } from '../../utils/HttpService';
const s = StyleSheet.create({
  picker: {
    width: '40%',
    position: 'absolute',
    right: Screen.wp(7),
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 999,
  },
  tabStyle: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabTextStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',

  }
});
class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageFrom: 'en',
      dataSource: {},
      inputText: '',
      selectedIndex: 0,
      tabData: [],
      loading: false
    };
    props.navigation.addListener('focus', () => {
      try {
        const interstitial = InterstitialAd.createAd(Constants.INTERSTITIAL__KEY);
        this.time = setTimeout(() => {
          interstitial.show()
        }, 60000);
      } catch (error) {
        console.log('error', error);
      }
    })
    props.navigation.addListener('blur', () => {
      clearTimeout(this.time)
    })
  }

  componentDidMount() {

    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  fetchData = () => {
    this.setState({ dataSource: {}, tabData: [], selectedIndex: 0, loading: true })
    fetch(
      DictionaryApi + this.state.languageFrom + '/' + this.state.inputText,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(response => {
        // console.log('response from google: ', response);
        if (response.title) {
          setTimeout(() => {
            Snackbar(response.title + "\n" + response.message, Strings.close);
          }, 50);
          this.setState({ loading: false })
        } else {
          console.log('response : ', response[0]);
          let item = [];
          response[0].meanings.forEach((e) => {
            item.push(e.partOfSpeech);
          });

          // console.log('itemYouWant',item);
          this.setState({ loading: false, dataSource: response[0], tabData: item });
        }
      })
      .catch(error => {
        console.log('There was an error', error);
        Snackbar(error.toString(), Strings.close);
        this.setState({ loading: false });
      });
  };

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  playBeep = (url) => {
    console.log('url', url);
    this.sound = new Sound(url, "", async (error) => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
      this.sound.play(async (success) => {
        console.log('ee', success);
      });
    });
  };

  audio = (url) => (
    <TouchableOpacity onPress={() => {
      this.playBeep(url)
    }} >
      <Image style={{ height: 20, width: 20, tintColor: Colors.primary }} source={ImageView.volume} />
    </TouchableOpacity>
  )

  render() {
    const { navigation } = this.props;
    const { inputText, dataSource, loading, selectedIndex, tabData } = this.state;
    return (
      <AppRoot>
        <Loader loading={loading} />
        <Header
          text={'Search'}
          onBack={() => navigation.goBack()}
          notification={() => navigation.navigate('Notification')}
        />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, marginTop: Screen.hp(1) }}>
            <TextInput
              fontBold
              value={inputText}
              title={Strings.dic}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={text =>
                this.setState({ inputText: text, emailError: '' })
              }
              placeholder={Strings.dicP}
              containerStyle={c.diputStyle}
              textinputStyle={c.dtextInput}
              returnKeyType={'search'}
              onSubmitEditing={() => {
                this.fetchData();
              }}
            // multiline={true}
            />

            {Object.keys(dataSource).length !== 0 ?
              <View style={{ padding: Screen.wp(1.6), marginTop: Screen.hp(1.6), flex: 1 }}>
                <Text style={{ fontFamily: Fonts.SemiBold, fontSize: Dimens.F40, color: Colors.secondary }}>
                  {dataSource.word}
                </Text>
                {dataSource.phonetics.length > 0 ?
                  <View style={[c.flexRow, { top: Screen.hp(0.7) }]}>
                    <Text style={[c.textNormal, { color: Colors.primary }]}>{dataSource.phonetics[1] && "/" + dataSource.phonetics[1].text + "/,"}{" /"}{dataSource.phonetics[0] && dataSource.phonetics[0].text}{"/ "}</Text>
                    {dataSource.phonetics && dataSource.phonetics[0].audio ?
                      this.audio(dataSource.phonetics[0].audio ? dataSource.phonetics[0].audio : dataSource.phonetics.length > 1 ? dataSource.phonetics[1].audio : '')
                      : dataSource.phonetics.length > 1 ?
                        this.audio(dataSource.phonetics[0].audio ? dataSource.phonetics[0].audio : dataSource.phonetics.length >1  ? dataSource.phonetics[1].audio : '')
                        : null}
                  </View>
                  : null}
                <SegmentedControlTab
                  values={tabData}
                  selectedIndex={selectedIndex}
                  tabsContainerStyle={{ width: tabData.length == 1 ? Screen.wp(90) : Screen.wp(80),top:Screen.hp(1.6) }}
                  onTabPress={this.handleIndexChange}
                  tabStyle={s.tabStyle}
                  tabTextStyle={s.tabTextStyle}
                />
                {Object.keys(dataSource).length !== 0 ?
                  <>
                    {this.tabContainer(selectedIndex, dataSource.meanings[selectedIndex].definitions && dataSource.meanings[selectedIndex].definitions)}
                  </>
                  : null}
              </View> :
              <View style={{ height: 50 }} />
            }

          </View>
        </ScrollView>
        <Ad adTypes={'Banner'} />
      </AppRoot>
    );
  }
  tabContainer = (tab, data, synonyms) => {
    if (tab == 0) {
      return (
        <View style={{ flex: 1, marginTop: Screen.hp(3.8), width: '96%', marginLeft: 8 }}>
          <Text style={c.textBold}>{Strings.definition}</Text>
          {data.map((e, i) => (
            <>
              <Text style={[c.textNormal, { marginTop: i == 0 ? 0 : Screen.hp(2) }]}>{i + 1}) {e.definition}</Text>
              {e.example ?
                <>
                  <Text style={[c.textNormal, { marginTop: 1 }]}>
                    <Text style={c.textNormal1}>{Strings.ex}: {" "}</Text>
                    {e.example}</Text>
                </>
                : null}

              {
                e.antonyms && e.antonyms.length > 0 ?
                  <View>
                    <Text style={c.textBold}>{Strings.antonyms}: {" "}</Text>
                    {e.antonyms.map((data, i) => (
                      <>
                        {i > 5 ?
                          null :
                          <Text style={[c.textNormal, { marginTop: 1 }]}>{data}</Text>
                        }
                      </>
                    ))}
                  </View>
                  : null
              }
              {
                e.synonyms && e.synonyms.length > 0 ?
                  <View>
                    <Text style={c.textBold}>{Strings.synonyms}: {" "}</Text>
                    {e.synonyms.map((data, i) => (
                      <>
                        {i > 5 ?
                          null :
                          <Text style={[c.textNormal, { marginTop: 1 }]}>{data}</Text>
                        }
                      </>
                    ))}
                  </View>
                  : null
              }

            </>
          ))}
        </View>
      )
    }
    else if (tab == 1) {
      return (
        <View style={{ flex: 1, marginTop: Screen.hp(3.8), width: '96%', marginLeft: 8 }}>
          <Text style={c.textBold}>{Strings.definition}</Text>
          {data.map((e, i) => (
            <>
              <Text style={[c.textNormal, { marginTop: i == 0 ? 0 : Screen.hp(2) }]}>{i + 1}) {e.definition}</Text>
              {e.example ?
                <>
                  <Text style={[c.textNormal, { marginTop: 1 }]}>
                    <Text style={c.textNormal1}>{Strings.ex}: {" "}</Text>
                    {e.example}</Text>
                </>
                : null}

              {
                e.antonyms && e.antonyms.length > 0 ?
                  <View>
                    <Text style={c.textBold}>{Strings.antonyms}: {" "}</Text>
                    {e.antonyms.map((data, i) => (
                      <>
                        {i > 5 ?
                          null :
                          <Text style={[c.textNormal, { marginTop: 1 }]}>{data}</Text>
                        }
                      </>
                    ))}
                  </View>
                  : null
              }
              {
                e.synonyms && e.synonyms.length > 0 ?
                  <View>
                    <Text style={c.textBold}>{Strings.synonyms}: {" "}</Text>
                    {e.synonyms.map((data, i) => (
                      <>
                        {i > 5 ?
                          null :
                          <Text style={[c.textNormal, { marginTop: 1 }]}>{data}</Text>
                        }
                      </>
                    ))}
                  </View>
                  : null
              }
            </>
          ))}
        </View>
      )
    }
    else if (tab == 2) {
      return (
        <View style={{ flex: 1, marginTop: Screen.hp(3.8), width: '96%', marginLeft: 8 }}>
          <Text style={c.textBold}>{Strings.definition}</Text>
          {data.map((e, i) => (
            <>
              <Text style={[c.textNormal, { marginTop: i == 0 ? 0 : Screen.hp(2) }]}>{i + 1}) {e.definition}</Text>
              {e.example ?
                <>
                  <Text style={[c.textNormal, { marginTop: 1 }]}>
                    <Text style={c.textNormal1}>{Strings.ex}: {" "}</Text>
                    {e.example}</Text>
                </>
                : null}

              {
                e.antonyms && e.antonyms.length > 0 ?
                  <View>
                    <Text style={c.textBold}>{Strings.antonyms}: {" "}</Text>
                    {e.antonyms.map((data, i) => (
                      <>
                        {i > 5 ?
                          null :
                          <Text style={[c.textNormal, { marginTop: 1 }]}>{data}</Text>
                        }
                      </>
                    ))}
                  </View>
                  : null
              }
              {
                e.synonyms && e.synonyms.length > 0 ?
                  <View>
                    <Text style={c.textBold}>{Strings.synonyms}: {" "}</Text>
                    {e.synonyms.map((data, i) => (
                      <>
                        {i > 5 ?
                          null :
                          <Text style={[c.textNormal, { marginTop: 1 }]}>{data}</Text>
                        }
                      </>
                    ))}
                  </View>
                  : null
              }
            </>
          ))}
        </View>
      )
    }
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
