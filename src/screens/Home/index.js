import { InterstitialAd } from '@react-native-admob/admob';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  ScrollView
} from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Ad, AppRoot, Header } from '../../component';
import {
  Constants,
  Dimens,
  Fonts,
  ImageView,
  Screen
} from '../../config/appConstants';
import { localNotificationService } from '../Notification//NotificationService';
const s = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '99.5%',
    marginTop: 10,
    alignSelf: 'center',
  },
  innerbox: {
    width: Screen.wp(46),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    elevation: 2,
    padding: 10,
    borderRadius: 10,
  },
  boxtxt: {
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    width: Screen.wp(46),
    fontSize: Dimens.F18,
  },
  box2: {marginTop: 10},
  box2: {marginTop: 10},
  img: {
    height: Screen.wp(20),
    alignSelf: 'center',
    width: Screen.wp(20),
  },
});

const Home = ({navigation}) => {
  var entry = ref => (entry = ref);
  var order = ref => (order = ref);
  var collection = ref => (collection = ref);
  var stock = ref => (stock = ref);
  var report = ref => (report = ref);
  var party = ref => (party = ref);

  const onOpenNotification = notify => {
    if (JSON.parse(notify?.type).c_type== 'blog' ) {
      navigation.navigate('BlogView', {
        data: {
          pdf_auto:
            JSON.parse(notify.blogs).baseurl + JSON.parse(notify.blogs).pdf,
          id: JSON.parse(notify.blogs).id,
          name: JSON.parse(notify.blogs).name,
        },
      });
   
    }
    if (JSON.parse(notify?.type).c_type == 'quiz' ) {
      navigation.navigate('Quiz');
    }
  };

  const onNotification = notify => {
    console.log('[App] onNotification: ', notify);
    const options = {
      soundName: 'score.wav',
      playSound: true,
    };
    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
      notify.image,
    );
  };

  const onRegister = token => {
    console.log('[App] onRegister: ', token);
  };

  useEffect(async () => {
    var time;
    navigation.addListener('focus', () => {
      try {
        const interstitial = InterstitialAd.createAd(
          Constants.INTERSTITIAL__KEY,
        );
        time = setTimeout(() => {
          interstitial.show();
        }, 8000);
      } catch (error) {
        console.log('error', error);
      }
    });
    navigation.addListener('blur', () => {
      clearTimeout(time);
    });
    // FCMService.registerAppWithFCM();
    // FCMService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
    return () => {
      // FCMService.unRegister();
      // localNotificationService.unregister();
    };
  }, []);
  return (
    <AppRoot>
      <Header
        openDrawer={() => navigation.openDrawer()}
        text={'Home'}
        notification={() => navigation.navigate('Notification')}
      />
      <ScrollView>
        <Animatable.View style={{flex: 1}} animation="pulse" duration={1000}>
          <View style={{flex: 1, padding: 10, marginTop: -Screen.hp(1)}}>
            <View style={s.box}>
              <TouchableOpacity
                style={s.innerbox}
                onPress={() => {
                  entry.pulse(500).then(endState => {
                    endState.finished
                      ? navigation.navigate('Translator')
                      : 'bounce cancelled';
                  });
                }}>
                <Animatable.View
                  animation="slideInLeft"
                  duration={1000}
                  ref={entry}>
                  {
                    <Image
                      source={ImageView.tr}
                      style={s.img}
                      resizeMode="contain"
                    />
                  }
                  <View style={s.box2}>
                    <Text style={s.boxtxt}>Translator</Text>
                  </View>
                </Animatable.View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[s.innerbox, {marginLeft: 0}]}
                onPress={() => {
                  order
                    .pulse(500)
                    .then(endState =>
                      console.log(
                        endState.finished
                          ? navigation.navigate('Dictionary')
                          : 'bounce cancelled',
                      ),
                    );
                }}>
                <Animatable.View
                  // style={s.innerbox}
                  animation="slideInRight"
                  duration={1000}
                  ref={order}>
                  {
                    <Image
                      source={ImageView.language}
                      style={s.img}
                      resizeMode="contain"
                    />
                  }
                  <View style={s.box2}>
                    <Text style={s.boxtxt}>Dictionary</Text>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
            </View>

            <View style={s.box}>
              <TouchableOpacity
                style={s.innerbox}
                onPress={() => {
                  collection
                    .pulse(500)
                    .then(endState =>
                      console.log(
                        endState.finished
                          ? navigation.navigate('Quiz')
                          : 'bounce cancelled',
                      ),
                    );
                }}>
                <Animatable.View
                  // style={s.innerbox}
                  animation="slideInLeft"
                  duration={1000}
                  ref={collection}>
                  <View style={s.box1}>
                    {
                      <Image
                        source={ImageView.quiz}
                        style={s.img}
                        resizeMode="contain"
                      />
                    }
                    <View style={s.box2}>
                      <Text style={s.boxtxt}>Daily Quiz</Text>
                    </View>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.innerbox}
                onPress={() => {
                  report
                    .pulse(500)
                    .then(endState =>
                      console.log(
                        endState.finished
                          ? navigation.navigate('Blog')
                          : 'bounce cancelled',
                      ),
                    );
                }}>
                <Animatable.View
                  // style={s.innerbox}
                  animation="slideInLeft"
                  duration={1000}
                  ref={report}>
                  <View style={s.box1}>
                    {
                      <Image
                        source={ImageView.blog}
                        style={s.img}
                        resizeMode="contain"
                      />
                    }
                    <View style={s.box2}>
                      <Text numberOfLines={2} style={s.boxtxt}>
                        Blog
                      </Text>
                    </View>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
            </View>
            <View style={s.box}>
              <TouchableOpacity
                style={[s.innerbox, {marginLeft: 0}]}
                onPress={() => {
                  stock
                    .pulse(500)
                    .then(endState =>
                      console.log(
                        endState.finished
                          ? navigation.navigate('Messages')
                          : 'bounce cancelled',
                      ),
                    );
                }}>
                <Animatable.View
                  // style={s.innerbox}
                  animation="slideInRight"
                  duration={1000}
                  ref={stock}>
                  <View style={s.box1}>
                    {
                      <Image
                        style={s.img}
                        source={ImageView.chat}
                        resizeMode="contain"
                      />
                    }
                    <View style={s.box2}>
                      <Text style={s.boxtxt}>Personal Assistant</Text>
                    </View>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.innerbox, {marginLeft: 0}]}
                onPress={() => {
                  stock
                    .pulse(500)
                    .then(endState =>
                      console.log(
                        endState.finished
                          ? navigation.navigate('Faq')
                          : 'bounce cancelled',
                      ),
                    );
                }}>
                <Animatable.View
                  // style={s.innerbox}
                  animation="slideInRight"
                  duration={1000}
                  ref={stock}>
                  <View style={s.box1}>
                    {
                      <Image
                        style={s.img}
                        source={ImageView.faq}
                        resizeMode="contain"
                      />
                    }
                    <View style={s.box2}>
                      <Text style={s.boxtxt}>FAQ</Text>
                    </View>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
            </View>
            <View style={s.box}>
              <TouchableOpacity
                style={[s.innerbox, {marginLeft: 0}]}
                onPress={() => {
                  stock
                    .pulse(500)
                    .then(endState =>
                      console.log(
                        endState.finished
                          ? navigation.navigate('About')
                          : 'bounce cancelled',
                      ),
                    );
                }}>
                <Animatable.View
                  // style={s.innerbox}
                  animation="slideInRight"
                  duration={1000}
                  ref={stock}>
                  <View style={s.box1}>
                    {
                      <Image
                        style={s.img}
                        source={ImageView.ab}
                        resizeMode="contain"
                      />
                    }
                    <View style={s.box2}>
                      <Text style={s.boxtxt}>About Us</Text>
                    </View>
                  </View>
                </Animatable.View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[s.innerbox, {marginLeft: 0}]}
                onPress={() => {
                  party
                    .pulse(500)
                    .then(endState =>
                      console.log(
                        endState.finished
                          ? navigation.navigate('ContactUs')
                          : 'bounce cancelled',
                      ),
                    );
                }}>
                <Animatable.View
                  // style={s.innerbox}
                  animation="slideInRight"
                  duration={1000}
                  ref={party}>
                  <View style={s.box1}>
                    {
                      <Image
                        source={ImageView.contact}
                        style={s.img}
                        resizeMode="contain"
                      />
                    }
                    <View style={s.box2}>
                      <Text style={s.boxtxt}>Contact Us</Text>
                    </View>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
            </View>
            
          </View>
        </Animatable.View>
      </ScrollView>
      <Ad adTypes={'Banner'} />
    </AppRoot>
  );
};
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
