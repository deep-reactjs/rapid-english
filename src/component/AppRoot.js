import React, { PureComponent } from "react";
import { SafeAreaView, StyleSheet, StatusBar,View } from 'react-native';
import {Colors} from '../config/appConstants'
const styles = StyleSheet.create({
  container: {
    flex: 1,  backgroundColor:Colors.secondary
  },
  view: {
    flex: 1,  backgroundColor:Colors.viewBox
  }
});
export default class AppRoot extends PureComponent {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' hidden={false} 
         backgroundColor={Colors.secondary}
        />
        <View style={styles.view}>
          {this.props.children}
        </View>
        </SafeAreaView>
    );
  }
}