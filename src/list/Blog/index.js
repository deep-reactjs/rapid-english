import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import c from "../../styles/commonStyle";
import { Colors, ImageView, Screen, Fonts } from "../../config/appConstants";
import { Ad } from '../../component';
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
    color: Colors.dark_gray,

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
    const { fileURL } = this.props;
    const rowID = this.props.index;
    const rowData = this.props.item;
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            { marginTop: rowID == 0 ? 0 : 0, paddingVertical: 0, borderBottomWidth: 1, borderBottomColor: Colors.light_gray, backgroundColor: 'white', paddingHorizontal: Screen.wp(3.8) }
          ]}
          onPress={() => this.props.onPress()}
        >
          <Text style={s.lightTxt}>{rowData.time}</Text>
          <View style={{ flex: 1, bottom: Screen.hp(0.8) }}>
            {rowData.title ? (
              <Text style={c.textBold}>{rowData.name}</Text>
            ) : null}
            <Image 
            resizeMode="cover"
            style={{ width: '99%', height: Screen.hp(20), marginVertical: Screen.hp(1), borderRadius: Screen.wp(1), backgroundColor: Colors.light_gray }} 
            source={{ uri: fileURL + rowData.image }} />
            <Text style={c.textNormal}>{rowData.title}</Text>
          </View>
        </TouchableOpacity>
        {(parseInt(rowID) + 1) % 2 == 0 && <Ad adTypes={'Interstitial'} />}
      </>
    );
  }
}
