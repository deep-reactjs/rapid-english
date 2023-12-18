import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { Colors } from '../config/appConstants';

const LoaderChat = () => {
  const dotScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const bounce = () => {
      Animated.sequence([
        Animated.timing(dotScale, {
          toValue: 1.3,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(dotScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]).start(() => bounce());
    };

    bounce();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { transform: [{ scale: dotScale }] }]} />
      <Animated.View
        style={[styles.dot, styles.dot2, { transform: [{ scale: dotScale }] }]}
      />
      <Animated.View
        style={[styles.dot, styles.dot3, { transform: [{ scale: dotScale }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 12
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  dot2: {
    backgroundColor: Colors.primary,
  },
  dot3: {
    backgroundColor: Colors.primary,
  },
});

export default LoaderChat;
