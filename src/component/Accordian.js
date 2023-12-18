import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Colors } from '../config/appConstants';

const StyledAccordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = new Animated.Value(expanded ? 1 : 0);

  const toggleAccordion = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const containerStyle = {
    // height: animation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 1], // Adjust the height as needed
    // }),
    overflow: 'hidden',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
        <Animated.Text
          style={[styles.icon, { transform: [{ rotate: rotateInterpolate }] }]}
        >
          ^
        </Animated.Text>
      </TouchableOpacity>
      {expanded && <Animated.ScrollView style={[styles.content, containerStyle]}>
        <Text style={styles.textContent}>{content}</Text>
      </Animated.ScrollView>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    marginVertical: 8,borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.light_gray,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1
  },
  icon: {
    fontSize: 24,
  },
  content: {
    padding: 16,
    backgroundColor: '#fff',
  },
  textContent: {
    fontSize: 18,
  },
});

export default StyledAccordion;
