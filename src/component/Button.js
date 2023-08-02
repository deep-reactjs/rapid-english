import React, { PureComponent } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,Image
} from "react-native";
import PropTypes from "prop-types";
import c from "../styles/commonStyle";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Dimens, Fonts,ImageView,Screen } from "../config/appConstants";

const pageStyle = StyleSheet.create({
  containerStyle: {
    borderRadius: 5,
    shadowColor: "#878787",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.0,
    elevation: 2,
    backgroundColor: Colors.icons,
    alignItems: "center",
    padding: Screen.hp("2%"),
  },
  textBtn: {
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.F16,
    color: Colors.white,
  },
});

class Button extends PureComponent<props> {
  render() {
    const { onPress, text, containerStyle, String, visible, rightImg } = this.props;
    return (
      <TouchableOpacity
        style={{}}
        activeOpacity={visible ? 1 : 0.8}
        onPress={visible ? null : onPress}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#5567ff", "#5567ff", "#5567ff"]}
          style={(pageStyle.containerStyle, containerStyle)}
        >
          {visible ? (
            <ActivityIndicator size="small" color={"white"} />
          ) : (
            <View style={c.flexRow}>
            <Text style={pageStyle.textBtn}>{text}</Text>
            {rightImg && <Image resizeMode="contain" style={c.iconImg18} source={rightImg} /> }
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  containerStyle: PropTypes.any,
  onPress: PropTypes.func,
  String: PropTypes.any,
};

Button.defaultProps = {
  containerStyle: pageStyle.containerStyle,
};

export default Button;
