import React, { useEffect, useState, useCallback } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Colors, Screen } from '../config/appConstants';
const ProgressBar = (props) => {
  const {
    height,
    progress,
    animated,
    indeterminate,
    progressDuration,
    indeterminateDuration,
    onCompletion,

    trackColor = '#A6A6A6',
  } = props;

  const [timer] = useState(new Animated.Value(0));
  const [width] = useState(new Animated.Value(0));

  const indeterminateAnimation = Animated.timing(timer, {
    duration: indeterminateDuration,
    toValue: 1,
    useNativeDriver: true,
    isInteraction: false,
  });

  useEffect(() => {
    if (indeterminate || typeof progress === 'number') {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [indeterminate, progress, startAnimation, stopAnimation]);

  const startAnimation = useCallback(() => {
    if (indeterminate) {
      timer.setValue(0);
      Animated.loop(indeterminateAnimation).start();
    } else {
      Animated.timing(width, {
        duration: animated ? progressDuration : 0,
        toValue: progress,
        useNativeDriver: false,
      }).start(() => {
        onCompletion();
      });
    }
  }, [
    animated,
    indeterminate,
    indeterminateAnimation,
    onCompletion,
    progress,
    progressDuration,
    timer,
    width,
  ]);

  const stopAnimation = useCallback(() => {
    if (indeterminateAnimation) indeterminateAnimation.stop();

    Animated.timing(width, {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  }, [indeterminateAnimation, width]);

  const styleAnimation = () => {
    return indeterminate
      ? {
          transform: [
            {
              translateX: timer.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [-0.6 * 320, -0.5 * 0.8 * 320, 0.7 * 320],
              }),
            },
            {
              scaleX: timer.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.0001, 0.8, 0.0001],
              }),
            },
          ],
        }
      : {
          width: width.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        };
  };

  const styles = StyleSheet.create({
    root: {
      height: 15,
      width: '82%',
      alignSelf: 'center',
      justifyContent:'center',
      alignItems:'center',
      marginBottom:Screen.hp(2),
     
    },
    container: {
      backgroundColor: Colors.light_gray,
      height: 12,
      borderRadius: 6,
      width: '100%',
    },
    progressBar: {
      flex: 1,
      borderRadius: 5,
      backgroundColor: Colors.primary,
    },
  });

  return (
    <View style={styles.root}>
      <Animated.View style={styles.container}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              ...styleAnimation(),
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

ProgressBar.defaultProps = {
  state: 'black',
  height: 2,
  progress: 0,
  animated: true,
  indeterminate: false,
  indeterminateDuration: 1100,
  progressDuration: 1100,
  onCompletion: () => {},
};

export default ProgressBar;
