import React, { Component } from 'react';
import { AppRoot, Separator, ProgressBar, Ad, Header, Loader, Button } from '../../component';
import c from '../../styles/commonStyle';
import {
  Screen,
  Colors,
  ImageView,
  Storage_Key,
  Strings,
  Fonts,
  Dimens,
  Constants,
} from '../../config/appConstants';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Vibration, Modal
} from 'react-native';
import { connect } from 'react-redux';
import { PrefManager } from '../../utils';
import Sound from "react-native-sound";
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Animatable from 'react-native-animatable';
import { InterstitialAd, TestIds } from '@react-native-admob/admob';
import { quizActions, onQuizClear } from '../../redux/actions/quizActions';
import { saveAnswerActions, saveAnswerClear } from '../../redux/actions/saveAnswerActions';
const s = StyleSheet.create({
  viewRoot: {
    backgroundColor: Colors.shadow,
    padding: Screen.hp(0.2),
    width: Screen.wp(100),
    // minHeight: Screen.hp(22),
    // maxHeight: Screen.hp(25),
    justifyContent: 'center',
    paddingVertical: Screen.hp(3),
    alignItems: 'center',
    marginBottom: 20,
  },
  boxStyle: {
    backgroundColor: Colors.white,
    width: '92%',
    alignSelf: 'center',
    padding: Screen.hp(0.5),
    // height: '78%',
    paddingVertical: Screen.hp(5),
    paddingHorizontal: Screen.hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 10,
  },
  qoutl: {
    height: 18,
    width: 18,
    transform: [{ rotate: '180deg' }],
    position: 'absolute',
    top: 14,
    left: 14,
  },
  qoutr: {
    height: 18,
    width: 18,
    transform: [{ rotate: '0deg' }],
    position: 'absolute',
    bottom: 14,
    right: 14,
  },
});
Sound.setCategory("Playback");
function convertTime(sec) {
  var hours = Math.floor(sec / 3600);
  hours >= 1 ? (sec = sec - hours * 3600) : (hours = '00');
  var min = Math.floor(sec / 60);
  min >= 1 ? (sec = sec - min * 60) : (min = '00');
  sec < 1 ? (sec = '00') : void 0;
  min.toString().length == 1 ? (min = '0' + min) : void 0;
  sec.toString().length == 1 ? (sec = '0' + sec) : void 0;
  return min + ':' + sec;
}
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      currentIndex: 0,
      active: '',
      quizComplete: false,
      labelData: ['a', 'b', 'c', 'd', 'e'],
      userdata: [],
      flag: false,
      total_attempt: 0,
      total_right: 0,
      timer: 90,
      attemp: false,
      InterstitialAd: InterstitialAd.createAd(Constants.INTERSTITIAL__KEY)
    };
    props.navigation.addListener('focus', async () => {
      this.setState({ flag: false })
      PrefManager.getValue(Storage_Key.id).then(id => {
        props.quizActions({ id: id });
      });
      this.CounterInterval()
    });
    this.isAnimation = null;
    this.explosion = null
    props.navigation.addListener('blur', async () => {
      this.setState({
        currentIndex: 0,
        active: '',
        flag: false,
        total_attempt: 0,
        total_right: 0,
        attemp: false
      })
      clearInterval(this.interval);
    })
  }

  componentDidMount() {

    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  playBeep = (string) => {
    var beep = new Sound(string, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
      beep.play(async (success) => {
        console.log('success');
      });
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.saveAnswer && props.saveAnswer.data && props.saveAnswer.status && !state.flag) {
      setTimeout(() => {
        props.saveAnswerClear()
        var beep = new Sound(Strings.score, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log("failed to load the sound", error);
            return;
          }
          beep.play(async (success) => {
            console.log('success');
          });
        });
      }, 1000);

      return {
        flag: true,
        quizComplete: true,
        currentIndex: 0,
        active: '',
        total_attempt: props.saveAnswer.data.total_attempt,
        total_right: props.saveAnswer.data.total_right
      };
    }

  }

  CounterInterval = () => {

    this.interval = setInterval(
      () => {
        if (this.props.quizData.data && this.props.quizData.message == "Quiz attempt has already been submitted") {
          clearInterval(this.interval);
          this.setState({ attemp: true })
          console.log('io', this.state.attemp);
        }
        else {
          this.setState(
            {
              timer: this.state.timer - 1, attemp: false
            },
            () => {
              if (this.state.timer === 0) {
                clearInterval(this.interval);
                let obj = {
                  que_id: this.props.quizData.data[this.state.currentIndex].id,
                  answer: '',
                  right_wrong: this.props.quizData.data[this.state.currentIndex].right
                }
                this.setState({
                  timer: 30,
                  active: this.props.quizData.data[this.state.currentIndex].right
                }, () => {
                  if (this.state.active != "") {
                    this.state.userdata.push(obj)
                  }
                  setTimeout(() => {
                    if (this.state.currentIndex + 1 == this.props.quizData.data.length) {
                      this.save()
                    } else {
                      try {
                        this.isAnimation.slideInRight(800);
                      } catch (error) {
                      }
                      this.setState({ currentIndex: this.state.currentIndex + 1, active: '', progress: this.state.progress + 10, });
                      this.CounterInterval();
                    }
                  }, 1000);
                },
                );
              }
            },
          )
        }
      },
      1000,
    );
  };

  save = () => {
    this.setState({ active: '' })
    PrefManager.getValue(Storage_Key.id).then(id => {
      this.props.saveAnswerActions({
        id: id,
        userdata: this.state.userdata
      })
    })
  }
  goBack = () =>{
    this.state.InterstitialAd.show()
    this.props.navigation.goBack()
  }

  render() {
    const { navigation, quizData, loading, loading1 } = this.props;
    const { progress, quizComplete, active, timer, currentIndex, labelData, total_attempt, total_right, answer, attemp } = this.state;
    return (
      <AppRoot>
        <Header
          text={'Daily Quiz'}
          onBack={() => this.goBack()}
          notification={() => navigation.navigate('Notification')}
        />
        <Loader loading={loading} />
        <Loader loading={loading1} />

        {quizComplete ? (
          <Modal
            ref={'updateModal'}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            visible={quizComplete}
            position="bottom"
            animationType='fade'
            backdrop={true}
            coverScreen={true}
            backdropPressToClose={false}
            backdropOpacity={0.5}
            transparent={true}
            swipeToClose={false}>
            <AppRoot>

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.secondary }}>
                <TouchableOpacity
                  onPress={() => {
                    try {
                      this.state.InterstitialAd.show()
                    } catch (error) {
                      console.log('error', error);
                    }
                    this.setState({ quizComplete: false })
                    navigation.navigate('Home')
                  }}
                  style={{ position: 'absolute', top: 36, right: Screen.wp(13) }}>
                  <Image source={ImageView.close} style={{ height: 20, width: 20, tintColor: Colors.white }} />
                </TouchableOpacity>
                <View style={{ width: Screen.wp(80), height: Screen.hp(50), alignSelf: 'center', backgroundColor: Colors.white, elevation: 5, borderRadius: Screen.wp(8) }}>
                  <Image source={ImageView.trophy} style={{ height: 66, width: 66, alignSelf: 'center', margin: Screen.wp(6), marginTop: Screen.wp(12) }} />
                  <Text style={{ fontFamily: Fonts.Bold, textAlign: 'center', fontSize: Dimens.F40, color: Colors.green }}>{total_attempt == total_right ? "Perfect " : " "} Score</Text>
                  <Text style={{ fontFamily: Fonts.SemiBold, textAlign: 'center', fontSize: Dimens.F30, color: Colors.black }}>{total_right + "/" + total_attempt}</Text>


                  <Text style={{ fontFamily: Fonts.Regular, textAlign: 'center', fontSize: Dimens.F16, paddingHorizontal: Screen.wp(3.5) }}>
                    You have answered
                    <Text style={{ fontFamily: Fonts.SemiBold, textAlign: 'center', fontSize: Dimens.F18, color: Colors.yellow }}>{" " + total_right + ' '}</Text>
                    out
                    <Text style={{ fontFamily: Fonts.SemiBold, textAlign: 'center', fontSize: Dimens.F18, color: Colors.green }}>{" " + total_attempt + ' '}</Text>
                    questions correctly.
                  </Text>

                  <Text style={{ fontFamily: Fonts.Bold, textAlign: 'center', fontSize: Dimens.F18, color: Colors.black, paddingHorizontal: Screen.wp(2), marginTop: 10 }}>Success! You have completed the quiz!</Text>

                
                </View>
                {total_attempt == total_right ?
                  <ConfettiCannon
                    count={200}
                    origin={{ x: -10, y: 0 }}
                    autoStart={quizComplete}
                  />
                  : null
                }
              </View>
            </AppRoot>
          </Modal>
        ) : (
          <>

            {quizData.data && quizData.data.length > 0 ? (
              <ScrollView>
                <View style={s.viewRoot}>
                  <View style={s.boxStyle}>
                    <Image
                      resizeMode="contain"
                      style={s.qoutl}
                      source={ImageView.quote}
                    />
                    <Text style={c.textBold}>
                      {quizData.data[currentIndex].name}
                    </Text>
                    <Image
                      resizeMode="contain"
                      style={s.qoutr}
                      source={ImageView.quote}
                    />
                  </View>
                </View>
                {
                  !attemp &&
                  <>
                    <ProgressBar progress={progress} />
                    <View
                      style={[
                        c.flexRowJus,
                        {
                          width: '82%',
                          alignSelf: 'center',
                          marginBottom: Screen.hp(2),
                        },
                      ]}>
                      <Text style={c.textNormal}>{`Q${currentIndex + 1} of ${quizData.data.length
                        }`}</Text>
                      <Text style={c.textNormal}>
                        {convertTime(timer)}
                        <Text style={c.textLight}>{' left'}</Text>
                      </Text>
                    </View>
                  </>
                }

                <Animatable.View ref={ref => (this.isAnimation = ref)}>
                  {quizData.data &&
                    quizData.data[currentIndex].option.map((data, index) => {
                      return (
                        <Animatable.View
                          style={{ flex: 1 }}
                          animation="pulse"
                          ref={ref => (data = ref)}
                          duration={1000}>
                          <TouchableOpacity
                            ref={data}
                            disabled={attemp}
                            activeOpacity={active ? 1 : 0.7}
                            onPress={
                              active
                                ? null
                                : () => {
                                  if (index != quizData.data[currentIndex].right) {
                                    console.log(index, quizData.data[currentIndex].right);
                                    Vibration.vibrate();
                                    this.playBeep(Strings.wrong)
                                    data.shake(800).then(endState =>
                                      console.log(
                                        endState.finished
                                          ? 'bounce finished'
                                          : 'bounce cancelled',
                                      ),
                                    );
                                  } else {
                                    this.playBeep(Strings.correct)
                                  }

                                  clearInterval(this.interval);
                                  let obj = {
                                    que_id: quizData.data[currentIndex].id,
                                    answer: index,
                                    right_wrong: quizData.data[currentIndex].right == index ? 1 : 2
                                  }
                                  this.setState({
                                    answer: index,
                                    active: quizData.data[currentIndex].right,
                                    timer: 30,
                                  }, () => {
                                    this.state.userdata.push(obj)
                                    setTimeout(() => {
                                      if (this.state.currentIndex + 1 == this.props.quizData.data.length) {
                                        this.save()
                                      } else {
                                        try {
                                          this.isAnimation.slideInRight(800);
                                        } catch (error) {
                                        }
                                        this.setState({
                                          active: '',
                                          answer: '',
                                          progress: this.state.progress + 10,
                                          currentIndex: this.state.currentIndex + 1,
                                        });
                                        this.CounterInterval();
                                      }
                                    }, 1000);
                                  },
                                  );
                                }
                            }>
                            <Animatable.View
                              animation="slideInRight"
                              // ref={ref => (this.isAnimation = ref)}
                              duration={1000}
                              style={[
                                c.McqButton,
                                {
                                  backgroundColor:
                                    attemp ?
                                      index == quizData.data[currentIndex].right ? Colors.green :
                                        quizData.data[currentIndex].answer_is == index ? Colors.red : Colors.white
                                      :
                                      active
                                        ? active == index
                                          ? Colors.green
                                          : answer == index ? Colors.red : Colors.white
                                        : Colors.white
                                },
                              ]}>
                              <View
                                style={[
                                  c.circleStyle,
                                  { backgroundColor: Colors.yellow },
                                ]}>
                                <Text
                                  style={[c.textNormal, { color: Colors.white }]}>
                                  {labelData[index]}
                                </Text>
                              </View>
                              <Text
                                style={[
                                  c.textNormal,
                                  {
                                    // color: Colors.secondary,
                                    marginLeft: 8,
                                    flex: 0.70,
                                    color:
                                      attemp ?
                                        index == quizData.data[currentIndex].right ? Colors.white :
                                          quizData.data[currentIndex].answer_is == index ? Colors.white : Colors.secondary
                                        :
                                        active
                                          ? active == index
                                            ? Colors.white
                                            : answer == index ? Colors.white : Colors.secondary
                                          : Colors.secondary,
                                  },
                                ]}>
                                {data}
                              </Text>
                            </Animatable.View>
                          </TouchableOpacity>
                        </Animatable.View>
                      );
                    })}
                </Animatable.View>
                {
                  attemp &&
                  <Button
                    text={this.state.currentIndex + 1 == this.props.quizData.data.length ? 'Finish' : 'Next'}
                    containerStyle={[c.Button, { marginBottom: Screen.hp(2.5) }]}
                    rightImg={this.state.currentIndex + 1 == this.props.quizData.data.length ? undefined : ImageView.erro}
                    onPress={() => {
                      if (this.state.currentIndex + 1 == this.props.quizData.data.length) {
                        navigation.goBack()
                      } else {
                        this.setState({
                          currentIndex: this.state.currentIndex + 1
                        })
                      }
                    }}
                  />
                }
              </ScrollView>
            ) : (
              <>
                {loading ? null : <Separator text={quizData && quizData.message ? quizData.message : Strings.noq} />}
              </>
            )}
          </>
        )}
        <Ad adTypes={'Banner'} />

        {/* {/* <Modal
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          visible={true}
          position="bottom"
          animationType='fade'
          backdrop={true}
          coverScreen={true}
          backdropPressToClose={false}
          backdropOpacity={0.5}
          transparent={true}
          swipeToClose={false}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{height:Screen.hp(30),width:'80%',alignSelf:'center',elevation:1,backgroundColor:'white',borderRadius:10,padding:10 }}>
            <Text style={{ fontFamily: Fonts.SemiBold, textAlign: 'left', fontSize: Dimens.F18, color: Colors.black }}>{"Watch the video to see how you did in the quiz."}</Text>
          </View>
          </View>
        </Modal> */}

      </AppRoot>
    );
  }
}
const mapStateToProps = state => {
  console.log('state', state);
  return {
    quizData: state.quiz.quizData,
    loading: state.quiz.loading,
    loading1: state.saveAnswer.loading,
    saveAnswer: state.saveAnswer.saveAnswer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    quizActions: data => {
      dispatch(quizActions(data));
    },
    onQuizClear: data => {
      dispatch(onQuizClear(data));
    },
    saveAnswerActions: data => {
      dispatch(saveAnswerActions(data));
    },
    saveAnswerClear: data => {
      dispatch(saveAnswerClear(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);