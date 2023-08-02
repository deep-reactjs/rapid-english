import React, { Component } from "react";
import T from "prop-types";
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Platform,
  Modal,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors, ImageView,Screen,Fonts, Dimens } from "../config/appConstants";
import { Picker as RPicker } from "@react-native-picker/picker";

class Picker extends Component {
  constructor(props) {
    super(props);
    this.isBorderBottom = this.props.isBorderBottom || true;
    this.state = {
      isVisibleModal: false,
      refresh: false,
    };
  }
  componentDidMount() {
    const {
      selectedValue,
      data = [],
      itemKeyField,
      itemValueField,
    } = this.props;
    if (Platform.OS == "ios") {
      if (selectedValue && data) {
        let item = data.find((x) => x[itemKeyField] == selectedValue);
        if (item) this.setPickerLabelIOS(item[itemValueField]);
        else
          this.setState({
            selecedValueLabelIOS: this.props.data[0][this.props.itemValueField],
          });
      } else
        this.setState({
          selecedValueLabelIOS: this.props.data[0][this.props.itemValueField],
        });
    }
    //
  }
  onToggleModal = (visible) => {
    if (visible) {
      this.setState({ isVisibleModal: !this.state.isVisibleModal });
    } else {
      if (this.props.selectedValue && this.props.data) {
        let item = this.props.data.find(
          (x) => x[this.props.itemKeyField] == this.props.selectedValue
        );
        if (item) this.setPickerLabelIOS(item[this.props.itemValueField]);
        else this.setPickerLabelIOS();
      } else this.setPickerLabelIOS();
      this.setState({ isVisibleModal: !this.state.isVisibleModal });
    }
  };
  setPickerLabelIOS = (value) => {
    this.setState({ selecedValueLabelIOS: value });
  };
  render() {
    const {
      data = [],
      label,
      title,
      labelStyle,
      pickerInputStyle,
      enabled = true,
    } = this.props;

    if (Platform.OS == "android") {
      return (
        <View style={[s.wrapper, this.props.containerStyle]}>
            {title ? <Text style={s.txtTitle}>{title}</Text> : null}
          <RPicker
            enabled={enabled}
            selectedValue={this.props.selectedValue}
            style={s.androidPicker}
            onValueChange={this.props.onValueChange}
            {...this.props}
          >
            {data.map((item, index) => {
              return (
                <RPicker.Item
                  key={`${item[this.props.itemKeyField]}_${index}`}
                  label={item[this.props.itemValueField]}
                  value={item[this.props.itemKeyField]}
                />
              );
            })}
          </RPicker>
        </View>
      );
    } else {
      return (
        <View style={this.props.containerStyle}>
          <View style={[s.inputWrapper, this.props.style, pickerInputStyle]}>
            <TouchableOpacity onPress={() => this.onToggleModal(true)}>
              <View style={s.SelectButton}>
                {!this.state.selecedValueLabelIOS ? (
                  <Text style={s.IOSPlaceholder}>{this.props.label}</Text>
                ) : null}
                <Text style={s.selectedValue}>
                  {this.state.selecedValueLabelIOS}
                </Text>
                <Image
                  source={ImageView.bottom}
                  resizeMode={"contain"}
                  style={{ height: 15, width: 15, tintColor: "black" }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isVisibleModal}
            onRequestClose={() => this.onToggleModal(true)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <TouchableOpacity
                onPress={() => this.onToggleModal(false)}
                style={s.IOSCloseBtn}
              />
              <View
                style={{
                  backgroundColor: Colors.white,
                  width: "100%",
                  zIndex: 99,
                  marginTop: "auto",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: 0,
                    }}
                    onPress={() => {
                      this.onToggleModal(false);
                    }}
                  >
                    <Text style={s.selectText}>
                      {this.state.selecedValueLabelIOS}
                    </Text>
                  </TouchableOpacity>
                </View>
                <RPicker
                  selectedValue={this.props.selectedValue}
                  onValueChange={this.props.onValueChange}
                  {...this.props}
                >
                  {this.props.data.map((item) => {
                    return (
                      <RPicker.Item
                        key={item[this.props.itemKeyField]}
                        label={item[this.props.itemValueField]}
                        value={item[this.props.itemKeyField]}
                      />
                    );
                  })}
                </RPicker>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  }
}
export default Picker;
Picker.propTypes = {
  containerStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  selectedValue: T.any,
  onValueChange: T.func.isRequired,
  data: T.any.isRequired,
  itemKeyField: T.string.isRequired,
  itemValueField: T.string.isRequired,
  isVisibleModal: T.bool,
  onToggleModal: T.func,
  onSelectIOS: T.func,
  selecedValueLabelIOS: T.string,
};
const s = StyleSheet.create({
  androidPicker: {
    height: 42,
    marginLeft: -8,
  },
  wrapper: {
    flex: 1,
    paddingLeft: 0,
    justifyContent: "center",
    // alignItems: "center",
    marginVertical: 4,
  },
  buttonSelect: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  inputWrapper: {
    marginVertical: 12,
    ...Platform.select({
      ios: {
        flex: 0,
        paddingHorizontal: 8,
      },
    }),
  },
  pickerArrow: {
    ...Platform.select({
      ios: {
        marginTop: 4,
        marginLeft: "auto",
      },
    }),
  },
  txtTitle: {
    color: Colors.secondary,
    paddingHorizontal: Screen.wp(1),
    marginBottom: -Screen.hp(1),
    fontSize: Dimens.F14,
    fontFamily: Fonts.Bold,
  },
  SelectButton: {
    flex: 0,
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  selectedValue: {
    marginRight: "auto",
  },
  selectText: {
    paddingTop: 16,
    paddingRight: 16,
    color: Colors.primary,
  },
  IOSCloseBtn: {
    flexBasis: "100%",
    flexGrow: 0,
    flexShrink: 0,
  },
  IOSPlaceholder: {
    color: Colors.dark_gray,
  },
});
