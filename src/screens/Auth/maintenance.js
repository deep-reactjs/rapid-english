import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { AppRoot} from '../../component';
import { Strings, Colors, ImageView, Fonts,  Screen, Dimens } from '../../config/appConstants';
export default class Maintenance extends Component {
  render() {
    return (
      <AppRoot >
        <View style={styles.container}>
          <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Image
                style={{ width: Screen.width * 0.55, height: Screen.width * 0.5 }}
                source={ImageView.maintenance}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center", marginHorizontal: 20 }}>
              {/* <Text
                style={{ fontSize: 20, color: Colors.primary,fontFamily:Fonts.Bold }}>
              {"Application"}
            </Text>

              <Text
                style={{ fontSize: 20, color: Colors.primary,fontFamily:Fonts.Bold }}>
                   {"Under Maintenance"}
               
            </Text> */}
              <Text
                style={{ fontSize: Dimens.F20, color: Colors.primary, fontFamily: Fonts.SemiBold, textAlign: 'center' }}>
                {this.props.route.params.txt}
              </Text>
            </View>
          </View>
        </View>
      </AppRoot>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
});
