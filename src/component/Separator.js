import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Dimens, Colors } from '../config/appConstants';
const s = StyleSheet.create({
  box: {
    width: '100%',
    height: '86%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.F16,
    color:Colors.secondary
  },
});
const Separator = props => {
  const {text} = props;
  return (
    <View style={s.box}>
      <Text style={s.txt}>{text}</Text>
    </View>
  );
};
export default Separator;