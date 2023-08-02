import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import {BottomSheet} from '../component';
import {Colors, Fonts, Screen} from '../config/appConstants';
import commonStyle from '../styles/commonStyle';
const renderSeparator = () => {
  return (
    <View
      style={{
        height: 0.8,
        width: '100%',
        backgroundColor:Colors.light_gray,
      }}
    />
  );
};
const Loader = ({open, onClose,data,selectedValue,onValueChange}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={open}
      onRequestClose={() => {
        onClose();
      }}>
      <Pressable
        style={{flex: 1,backgroundColor:'rgba(0,0,0,0.6)'}}
        onPress={() => {
          onClose();
        }}>
        <View style={styles.modalMain}>
          <View style={styles.box} />

          <FlatList
            data={Object.keys(data)}
            style={{flex: 1}}
            renderItem={({item}) => (
                <TouchableOpacity onPress={()=>onValueChange(item)}
                     style={{width:'100%',height:50}}>
                    <Text style={[styles.item,{color:selectedValue == item ? Colors.primary:undefined}]}>{data[item]}</Text>
                </TouchableOpacity>
            )}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
const styles = StyleSheet.create({
  box: {
    height: 2.6,
    width: 46,
    backgroundColor: Colors.medium_gray,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  contentModalStyle: {
    width: '100%',
    height: Screen.hp('100%'),
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalMain: {
    height: Screen.hp(65),
    backgroundColor: Colors.white,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    elevation:2
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
});
export default Loader;
