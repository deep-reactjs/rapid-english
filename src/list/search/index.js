import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import c from "../../styles/commonStyle";
import { StarCount } from "../../component";
import {
    Colors,
    Screen,
    Fonts,
    Dimens
} from "../../config/appConstants";

const s = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: Screen.wp(3),
        overflow: 'hidden',
        elevation: 1,
        marginBottom: 1,
        width: Screen.wp("45%"),
        marginRight: Screen.wp(3),
        marginBottom: Screen.hp(2),
    },
    img: {
        height: Screen.hp("20%"),
        width: Screen.wp("45%"),
    },
    title: {
        fontFamily: Fonts.SemiBold,
        color: Colors.black,
        fontSize: Dimens.F18
    },
    text: {
        fontFamily: Fonts.Regular,
        color: Colors.medium_gray,
        fontSize: Dimens.F16
    },
    rating: {
        fontFamily: Fonts.Regular,
        color: Colors.medium_gray,
    },
    amount: {
        fontFamily: Fonts.SemiBold,
        color: Colors.black,
        fontSize: Dimens.F16
    },
});
export default class discountList extends React.Component {
    state = {
        refresh: false
    };
    componentDidMount() {
        Screen.OrientationChange(this);
    }
    render() {
        const { navigation, onPress } = this.props;
        const rowID = this.props.index;
        const rowData = this.props.item;
        const { cardStyle } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[s.card]}
                onPress={onPress}
            >
                <Image source={{ uri: rowData.img }} style={s.img} />
                <View style={{ padding: Screen.wp(2) }}>
                    <Text numberOfLines={2} style={s.title}>{rowData.name}</Text>
                    <Text style={s.text}>{rowData.cat}</Text>
                    <View style={c.flexRow}>
                        <StarCount size={16} count={4} />
                        <Text style={s.rating}>4/5</Text>
                    </View>
                    <Text style={s.amount}>$125</Text>
                </View>
            </TouchableOpacity >
        );
    }
}