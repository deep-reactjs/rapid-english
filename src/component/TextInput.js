import React, { PureComponent } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  Image,
  Text
} from "react-native";
import { Colors, Dimens, Fonts, Screen } from "../config/appConstants";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import c from "../styles/commonStyle";
import Icon from "react-native-vector-icons/MaterialIcons";

const s = StyleSheet.create({
  container: {
    alignSelf: "center"
  },
  textInput: {
    flex: 1,
    fontSize: Dimens.F16,
    color: Colors.secondary
  },
  errorStyle: {
    paddingHorizontal: Screen.wp(2),
    paddingTop: Screen.wp(1),
    fontFamily: Fonts.Regular,
    color: Colors.red,
    fontSize: Dimens.F14
  },
  txtTitle: {
    color: Colors.secondary,
    fontSize: Dimens.F14,
    fontFamily: Fonts.Bold
  },
  flexRow: {
    ...c.flexRow
  }
});

class MyTextInput extends PureComponent<props> {
  state = {
    isFocused: false,
    isError: false,
    inputBorderColor: Colors.medium_gray
  };

  handleFocus = event => {
    this.setState({ isFocused: true, inputBorderColor: Colors.secondary });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = event => {
    this.setState({
      isFocused: false,
      inputBorderColor: Colors.medium_gray,
      isError: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  getInnerRef = () => this.ref;

  render() {
    const { isFocused, isError } = this.state;
    const {
      title,
      leftIcon,
      textinputStyle,
      containerStyle,
      returnKeyType,
      imagename,
      autoCapitalize,
      selectionColor,
      placeholderTextColor,
      multiline,
      inputstyle,
      rightPress,
      rightImagename,
      imagecolor,
      fontBold,
      borderDisable,
      errorText,
      iconName,
      ...otherProps
    } = this.props;

    return (
      <View style={[s.container, containerStyle]}>
        {title ? <Text style={s.txtTitle}>{title}</Text> : null}
        <View
          style={[
            s.flexRow,
            textinputStyle,
            {
              borderBottomWidth: borderDisable ? 0 : 0.6,
              borderColor: this.state.inputBorderColor
            }
          ]}
        >
          {imagename ? (
            <View
              style={{
                flex: 0.15,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                resizeMode={"contain"}
                style={{ height: 18, width: 18 }}
                source={imagename}
              />
            </View>
          ) : iconName ? (
            <View style={{ marginRight: 10 }}>
              <Icon
                name={iconName}
                size={20}
                color={isFocused ? Colors.secondary : Colors.medium_gray}
              />
            </View>
          ) : null}
          <TextInput
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholderTextColor={placeholderTextColor}
            autoCapitalize={autoCapitalize}
            selectionColor={Colors.primary}
            style={[
              s.textInput,
              inputstyle,
              {
                minHeight: multiline ? 80 : null,
                fontFamily: fontBold ? Fonts.Regular : Fonts.Regular,
                textAlignVertical: multiline ? "top" : null
              }
            ]}
            multiline={multiline}
            returnKeyType={returnKeyType}
            spellCheck={false}
            secureTextEntry={false}
            ref={r => (this.ref = r)}
            {...otherProps}
          />
          {rightPress ? (
            <View style={{ flex: 0.15 }}>
              <TouchableOpacity onPress={rightPress}>
                <Image
                  resizeMode={"contain"}
                  style={{
                    height: 12,
                    width: 12,
                    tintColor: imagecolor ? imagecolor : undefined
                  }}
                  source={rightImagename}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {errorText ? <Text style={s.errorStyle}>{errorText}</Text> : null}
      </View>
    );
  }
}

MyTextInput.propTypes = {
  textinputStyle: PropTypes.any,
  inputstyle: PropTypes.any,
  containerStyle: PropTypes.any,
  imagename: PropTypes.any,
  multiline: PropTypes.bool,
  borderDisable: PropTypes.bool,
  fontBold: PropTypes.bool,
  returnKeyType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  selectionColor: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  rightPress: PropTypes.func,
  rightImagename: PropTypes.any,
  imagecolor: PropTypes.string,
  title: PropTypes.string,
  errorText: PropTypes.string,
  secureTextEntry: PropTypes.bool
};

MyTextInput.defaultProps = {
  returnKeyType: "next",
  autoCapitalize: "none",
  selectionColor: "#c3d3d4"
};
export default MyTextInput;
