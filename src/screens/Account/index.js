import React, { Component } from "react";
import { Ad, AppRoot, Header } from "../../component";
import c from "../../styles/commonStyle";
import { Colors, Screen, ImageView, Storage_Key } from "../../config/appConstants";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { PrefManager } from "../../utils";
const s = StyleSheet.create({
  bg: {
    flex: 0.7,
    backgroundColor: Colors.light,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    height: Screen.wp('28%'),
    width: Screen.wp('28%'),
    borderRadius: Screen.wp('14%'),
    backgroundColor: Colors.white,
  },
  list: {
    height: 50,
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomColor: Colors.light_gray,
    borderBottomWidth: 1
  },
  edtbtn: {
    height: 30,
    width: 30,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.white,
    right: 0,
    bottom: 0
  },
  lgbtn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 10,
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      email: "",
      name: "",
    };
    props.navigation.addListener('focus', async () => {
      PrefManager.getValue(Storage_Key.name).then(name => {
        PrefManager.getValue(Storage_Key.email).then(email => {
          PrefManager.getValue(Storage_Key.profile).then(profile => {
            this.setState({
              profile: profile,
              email: email,
              name: name,
            })
          })
        })
      })
    })
  }

  componentDidMount() {
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  listItem = (title, nav) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[c.flexRow, s.list]}
        onPress={() => this.props.navigation.navigate(nav)}>
        <Text style={c.textNormal}>{title}</Text>
        <Icon size={20} name='keyboard-arrow-right' />
      </TouchableOpacity>
    )
  }

  render() {
    const { navigation } = this.props;
    const { name, profile, email, base } = this.state;
    return (
      <AppRoot>
        <Header
          text={"Profile"}
          onBack={() => navigation.goBack()}
          notification={() => navigation.navigate("Notification")}
        />
        <View style={{ flex: 1 }}>
          <View style={s.bg}>
            <View>
              <Image
                style={s.img}
                resizeMode='cover'
                source={
                  profile
                    ? { uri: profile }
                    : ImageView.noImage}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                style={s.edtbtn}
                onPress={() => navigation.navigate('EditProfile')}>
                <Icon color={Colors.white} name='edit' size={20} />
              </TouchableOpacity>
            </View>
            <Text style={[c.textBold, { marginTop: 5 }]}>{name}</Text>
            <Text style={[c.textNormal, { marginTop: 2 }]}>{email}</Text>
          </View>

          {/* {this.listItem('My Score', 'Score')} */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={s.lgbtn}
            onPress={() => { }}>
            <Text style={[c.textNormal, { color: Colors.red, marginRight: 10 }]}>Logout</Text>
            <Icon name='power-settings-new' color={Colors.red} size={20} />
          </TouchableOpacity>
        </View>
        <Ad adTypes={'Banner'} />
      </AppRoot >
    );
  }
}
const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);