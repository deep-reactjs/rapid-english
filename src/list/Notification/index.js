import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import c from "../../styles/commonStyle";
import { Colors, ImageView, Screen, Fonts } from "../../config/appConstants";
import Icon from "react-native-vector-icons/MaterialIcons";

const s = StyleSheet.create({
  iconBg: {
    height: 30,
    width: 30,
    backgroundColor: Colors.light_gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  lightTxt: {
    fontFamily: Fonts.Regular,
    color: Colors.dark_gray
  }
});

export default class discountList extends React.Component {
  state = {
    refresh: false
  };
  componentDidMount() {
    Screen.OrientationChange(this);
  }

  textView = (key, value) => (
    <View style={c.flatRow}>
      <Text style={c.flatTBold}>{key}</Text>
      <Text style={c.flatT}>:</Text>
      <Text style={c.flatTNormal}>{value}</Text>
    </View>
  );
  render() {
    const { navigation } = this.props;
    const rowID = this.props.index;
    const rowData = this.props.item;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          c.flatRoot,
          { marginTop: rowID == 0 ? 10 : 0, paddingVertical: 10,paddingHorizontal:10 }
        ]}
        onPress={() => this.props.onPress()}
      >
        <Text style={s.lightTxt}>{rowData.l_date}</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5
          }}
        >
            {rowData.pdf_auto && rowData.pdf_auto.image ? (
          <View style={s.iconBg}>
            <Image style={{height:25,width:25}} source={{uri:rowData.pdf_auto.baseurl+rowData.pdf_auto.image}}/>
          </View>
           ) : null}
          <View style={{ flex: 1, marginLeft: 10 }}>
          {rowData.pdf_auto && rowData.pdf_auto.name ? (
              <Text style={c.textBold}>{rowData.pdf_auto.name}</Text>
            ) : null}
            {rowData.pdf_auto && rowData.pdf_auto.title ? (
            <Text style={c.textNormal}>{rowData.pdf_auto.title}</Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
