import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import GestureRecognizer from 'react-native-swipe-gestures';
import { Colors, Dimens, Fonts, ImageView, Constants, Screen } from "../config/appConstants";
import { InterstitialAd, TestIds } from "@react-native-admob/admob";
const pageStyle = StyleSheet.create({
  root: {
    paddingVertical: Screen.hp("1.2%"),
    backgroundColor: Colors.white,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 99999,
  },
  textstyle: {
    textAlign: "left",
    marginLeft: 5,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.F18,
    color: Colors.secondary
  },
  btnstyle: {
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    marginRight: 5,
    borderRadius: 18,
  },
});

class Header extends PureComponent<props> {
  state = {
    profile: null,
    InterstitialAd: InterstitialAd.createAd(Constants.INTERSTITIAL__KEY)
  };
  render() {
    const {
      openDrawer,
      onBack,
      text,
      drawer,
      returnKeyType,
      autoCapitalize,
      selectionColor,
      logOut,
      onLogout,
      onAdd,
      notification,
      ...otherProps
    } = this.props;
    return (
      <GestureRecognizer
        onSwipeDown={onBack}
        config={Constants.config}
        style={pageStyle.root}>
        <View style={{ flex: 0.5, alignItems: "center", flexDirection: "row" }}>
          {openDrawer ? (
            <TouchableOpacity style={pageStyle.btnstyle} onPress={openDrawer}>
              <Image
                resizeMode={"contain"}
                style={{ height: "80%", width: "80%"}}
                source={ImageView.menu}
              />
            </TouchableOpacity>
          ) : (
              <TouchableOpacity style={pageStyle.btnstyle}
               onPressOut={()=>{
                this.state.InterstitialAd.show()
               }}
               onPress={onBack}>
                <Image
                  resizeMode={"contain"}
                  style={{ height: "80%", width: "80%"}}
                  source={ImageView.back}
                />
              </TouchableOpacity>
            )}

     
          {text && (
            <Text numberOfLines={1} style={pageStyle.textstyle}>{text}</Text>
          ) }
        </View>

        <View
          style={{
            flex: 0.5,
            alignItems: "flex-end",
            flexDirection: "row",
            marginRight: 5,
            justifyContent: "flex-end",
          }}>
          {notification ?
            <TouchableOpacity
              style={pageStyle.btnstyle}
              onPress={notification}
            >
              <Image
                resizeMode={"contain"}
                style={{
                  height: "75%",
                  width: "75%",
                
                  marginLeft: onAdd ? 0 : 10,
                }}
                source={ImageView.notification}
              />
            </TouchableOpacity>
            : null}
        </View>
 </GestureRecognizer>
    );
  }
}
Header.propTypes = {
  text: PropTypes.string,
  openDrawer: PropTypes.func,
  onBack: PropTypes.func,
  onAdd: PropTypes.func,
  notification: PropTypes.func,
};

Header.defaultProps = {
  containerStyle: pageStyle.containerStyle,
  returnKeyType: "next",
  autoCapitalize: "none",
  selectionColor: "#c3d3d4",
};

export default Header;
