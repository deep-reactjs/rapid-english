import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import GestureRecognizer from 'react-native-swipe-gestures';
import { Colors, Dimens, Fonts, ImageView, Constants, Screen } from "../config/appConstants";
const pageStyle = StyleSheet.create({
  root: {
    paddingVertical: Screen.hp("1.2%"),
    backgroundColor: Colors.secondary,
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
    paddingBottom: 5,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.F18,
    color: Colors.white
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
      onCart,
      placeholderTextColor,
      onChange,
      message,
      disscusion,
      onNote,
      onShare,
      onQue,
      ...otherProps
    } = this.props;
    return (
      <GestureRecognizer
        onSwipeDown={onBack}
        config={Constants.config}
        style={pageStyle.root}>
        <View style={{ flex: 0.5, alignItems: "center", flexDirection: "row" }}>
          {/* {openDrawer ? (
            <TouchableOpacity style={pageStyle.btnstyle} onPress={openDrawer}>
              <Image
                resizeMode={"contain"}
                style={{ height: "80%", width: "80%", marginBottom: 5, tintColor: Colors.white }}
                source={ImageView.menu}
              />
            </TouchableOpacity>
          ) : (
              <TouchableOpacity style={pageStyle.btnstyle} onPress={onBack}>
                <Image
                  resizeMode={"contain"}
                  style={{ height: "80%", width: "80%", marginBottom: 5,tintColor: Colors.white }}
                  source={ImageView.back}
                />
              </TouchableOpacity>
            )} */}

          {onBack ? <TouchableOpacity style={pageStyle.btnstyle} onPress={onBack}>
            <Image
              resizeMode={"contain"}
              style={{ height: "80%", width: "80%", marginBottom: 5, tintColor: Colors.white }}
              source={ImageView.back}
            />
          </TouchableOpacity>
            :
            null
          }

          {text ? (
            <Text style={pageStyle.textstyle}>{text}</Text>
          ) : (
              <View style={{
                width: 60,
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                height: 40
              }}>
                <Image
                  resizeMode={"contain"}
                  style={{ width: "100%", height: '100%' }}
                  source={ImageView.logo}
                />
              </View>
            )}
        </View>

        <View
          style={{
            flex: 0.5,
            alignItems: "flex-end",
            flexDirection: "row",
            marginRight: 5,
            justifyContent: "flex-end",
          }}
        >

          {message ?
            <TouchableOpacity
              style={pageStyle.btnstyle}
              onPress={message}
            >
              <Image
                resizeMode={"cover"}
                style={{
                  height: "75%",
                  width: "75%",
                  tintColor: Colors.white,
                  marginLeft: onAdd ? 0 : 10,
                }}
                source={ImageView.chat_ol}
              />
            </TouchableOpacity>
            : null}

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
                  tintColor: Colors.white,
                  marginLeft: onAdd ? 0 : 10,
                }}
                source={ImageView.notification}
              />
            </TouchableOpacity>
            : null}

          {
            onCart ?
              <TouchableOpacity
                style={pageStyle.btnstyle}
                onPress={onCart}
              >
                <Image
                  resizeMode={"contain"}
                  style={{
                    height: "75%",
                    width: "75%",
                    tintColor: Colors.white,
                    marginLeft: onAdd ? 0 : 10,
                  }}
                  source={ImageView.cart}
                />
              </TouchableOpacity>
              :
              null
          }

          {onNote ?
            <TouchableOpacity style={pageStyle.btnstyle} onPress={onNote}>
              <Image
                resizeMode={"contain"}
                style={{ height: "60%", width: "60%", tintColor: Colors.white }}
                source={ImageView.note}
              />
            </TouchableOpacity>
            : null}

        </View>

        {onAdd ? (
          <TouchableOpacity style={pageStyle.btnstyle} onPress={onAdd}>
            <Image
              resizeMode={"contain"}
              style={{
                height: "60%",
                width: "60%",
                tintColor: Colors.white,
              }}
              source={ImageView.add}
            />
          </TouchableOpacity>
        ) : null}

        {disscusion ? <TouchableOpacity style={pageStyle.btnstyle} onPress={disscusion}>
          <Image
            resizeMode={"contain"}
            style={{ height: "80%", width: "80%", marginBottom: 5, tintColor: Colors.white }}
            source={ImageView.disscusion}
          />
        </TouchableOpacity>
          : null}

        {onShare ? (
          <TouchableOpacity style={pageStyle.btnstyle} onPress={onShare}>
            <Image
              resizeMode={"contain"}
              style={{
                height: "60%",
                width: "60%",
                tintColor: Colors.white,
              }}
              source={ImageView.share}
            />
          </TouchableOpacity>
        ) : null}

        {onQue ? (
          <TouchableOpacity style={pageStyle.btnstyle} onPress={onQue}>
            <Image
              resizeMode={"contain"}
              style={{
                height: "60%",
                width: "60%",
                tintColor: Colors.white,
              }}
              source={ImageView.about}
            />
          </TouchableOpacity>
        ) : null}


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
  returnKeyType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  selectionColor: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  onChange: PropTypes.func,
  onLogout: PropTypes.func,
  onCart: PropTypes.func,
};

Header.defaultProps = {
  containerStyle: pageStyle.containerStyle,
  returnKeyType: "next",
  autoCapitalize: "none",
  selectionColor: "#c3d3d4",
};

export default Header;
