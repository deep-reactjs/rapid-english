import React, {useState, useRef, useEffect} from 'react';

import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  Easing,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Colors, Screen} from '../config/appConstants';

const {height} = Dimensions.get('window');

const SwipeUpDownModal = props => {
  const TIMING_CONFIG = {
    duration: props.duration ? props.duration : 400,
    easing: Easing.inOut(Easing.ease),
  };

  const pan = useRef(new Animated.ValueXY()).current;

  let [isAnimating, setIsAnimating] = useState(
    props.DisableHandAnimation ? true : false,
  );

  const [bg, setBg] = useState('rgba(0,0,0,0.25)');

  let animatedValueX = 0;

  let animatedValueY = 0;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (isAnimating) {
          return false;
        }
        if (gestureState.dy > 22) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: animatedValueX,
          y: animatedValueY,
        });
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue({x: 0, y: gestureState.dy});
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 0) {
          if (gestureState.vy <= -0.7 || gestureState.dy <= -100) {
            setIsAnimating(true);
            Animated.timing(pan, {
              toValue: {x: 0, y: -height},
              ...TIMING_CONFIG,
              useNativeDriver: false,
            }).start(() => {
              setIsAnimating(false);
              props.onClose();
            });
          } else if (gestureState.vy >= 0.5 || gestureState.dy >= 100) {
            setIsAnimating(true);
            Animated.timing(pan, {
              toValue: {x: 0, y: height},
              ...TIMING_CONFIG,
              useNativeDriver: false,
            }).start(() => {
              setIsAnimating(false);
              props.onClose();
            });
          } else {
            setIsAnimating(true);
            Animated.spring(pan, {
              toValue: 0,
              useNativeDriver: false,
            }).start(() => {
              setIsAnimating(false);
              // props.onClose();
            });
          }
        } else {
          setIsAnimating(true);
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start(() => {
            setIsAnimating(false);
            // props.onClose();
          });
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      animatedValueX = 0;
      animatedValueY = 0;
      pan.setOffset({
        x: animatedValueX,
        y: animatedValueY,
      });
      pan.setValue({
        x: 0,
        y: props.OpenModalDirection == 'up' ? -height : height,
      });
      pan.x.addListener(value => (animatedValueX = value.value));
      pan.y.addListener(value => (animatedValueY = value.value));
    }
  }, [props.modalVisible]);

  useEffect(() => {
    if (props.PressToanimate) {
      setIsAnimating(true);
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: props.PressToanimateDirection == 'up' ? -height : height,
        },
        ...TIMING_CONFIG,
        useNativeDriver: false,
      }).start(() => {
        setIsAnimating(false);
        props.onClose();
      });
    }
  }, [props.PressToanimate]);

  let handleGetStyle = opacity => {
    return [
      [
        styles.container,
        {
          transform: [{translateX: pan.x}, {translateY: pan.y}],
          opacity: opacity,
        },
        [props.HeaderStyle],
      ],
    ];
  };

  let handleGetStyleBody = opacity => {
    return [
      [
        styles.background,
        {
          transform: [{translateX: pan.x}, {translateY: pan.y}],
          opacity: opacity,
        },
      ],
      [props.ContentModalStyle],
    ];
  };
  let handleMainBodyStyle = opacity => {
    return [
      [
        styles.ContainerModal,
        {
          // backgroundColor: bg,
          opacity: opacity,
        },
      ],
      [props.MainContainerModal],
    ];
  };

  let interpolateBackgroundOpacity = pan.y.interpolate({
    inputRange: [-height, 0, height],
    outputRange: [props.fade ? 0 : 1, 1, props.fade ? 0 : 1],
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        setBg('rgba(0,0,0,0)');
        props.onRequestClose;
      }}
      onShow={() => {
        setIsAnimating(true);
        Animated.timing(pan, {
          ...TIMING_CONFIG,
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start(() => {
          setIsAnimating(false);
        });
      }}>
      <SafeAreaView style={{flex: 1, backgroundColor: bg}}>
        <Animated.View
          style={handleMainBodyStyle(interpolateBackgroundOpacity)}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIsAnimating(true);
              Animated.timing(pan, {
                duration: 450,
                easing: Easing.out(Easing.ease),
                toValue: {x: 0, y: 800},
                useNativeDriver: false,
              }).start(() => {
                setIsAnimating(false);
              });
              setBg('rgba(0,0,0,0.25)');
            
              setTimeout(() => {
                props.onClose();
              }, 450);
            }}
            style={styles.TouchWithoutFeedBack}>
            <Animated.View
              style={handleGetStyleBody(interpolateBackgroundOpacity)}
              {...panResponder.panHandlers}>
              <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
                style={styles.TouchWithoutFeedBack}>
                {props.ContentModal}
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableOpacity>
          <Animated.View
            style={handleGetStyle(interpolateBackgroundOpacity)}
            {...panResponder.panHandlers}>
            <TouchableWithoutFeedback>
              {props.HeaderContent ? props.HeaderContent : <View />}
            </TouchableWithoutFeedback>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    opacity: 0,
    flex: 1,
    marginTop: 55,

  },
  container: {
    marginTop: 50,
    position: 'absolute',
    width: '100%',
  },
  ContainerModal: {backgroundColor: 'transparent', flex: 1},

  TouchWithoutFeedBack: {flex: 1},
});

export default SwipeUpDownModal;
