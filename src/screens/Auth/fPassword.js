import React, { Component } from "react";
import c from "../../styles/commonStyle";
import {connect} from 'react-redux';
import {Helper, PrefManager} from '../../utils';
import { View, StyleSheet, Image, Text } from "react-native";
import {
  AppRoot,
  TextInput,
  Button,
  ScrollableAvoidKeyboard,Snackbar
} from "../../component";
import {
  Strings,
  Colors,
  ImageView,
  Screen,
} from "../../config/appConstants";
import {fPasswordActions,FPasswordClear} from '../../redux/actions/authActions';

const s = StyleSheet.create({
  logoStyle: {
    height: Screen.hp(26),
    width: Screen.wp(46),
    alignSelf: "center",
    marginTop: Screen.hp("2%"),
  },
  pwdText: {
    textAlign: "right",
    right: Screen.wp(15),
    paddingVertical: Screen.hp(2),
    ...c.textNormal,
  },
});

class FPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
        };
  }
  componentDidMount() {
    Screen.OrientationChange(this);
  }
  componentWillUnmount() {
    Screen.OrientationListener();
  }

  componentDidUpdate(prevProps) {
    const { data, loading, navigation, FPasswordClear } = this.props;
    const { email, name, mobile, password } = this.state;
    if (Object.keys(data).length !== 0 && data.status && !loading) {
      Snackbar(`"Mail has been Sent successfully. If you don't see the email in your Inbox, Please check your spam box."`, Strings.close);
      navigation.goBack()
      setTimeout(() => {
        FPasswordClear()
      }, 500);
    }
  }
  render() {
    const { loading } = this.props;
    return (
      <AppRoot>
        <View style={{flex: 1, backgroundColor:Colors.white}}>
          <ScrollableAvoidKeyboard
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"handled"}
          >
            <Image
              source={ImageView.logo}
              style={s.logoStyle}
              resizeMode={"contain"}
            />
            <Text
              style={[
                c.textNormal,
                {
                  paddingHorizontal: Screen.wp(10),
                  textAlign: "left",
                  paddingVertical: Screen.hp(2),
                },
              ]}
            >
              {Strings.fmsg}
            </Text>
            <TextInput
              title={Strings.email}
              placeholderTextColor={Colors.dark_gray}
              onChangeText={(text) => this.setState({ email: text})}
              keyboardType={'email-address'}
              placeholder={Strings.email}
              containerStyle={[c.loginInput, { marginBottom: Screen.hp(2) }]}
              textinputStyle={c.logininputStyle}
              iconName={"email"}
              returnKeyType={"next"}
              onSubmitEditing={() => {
                this.submit()
              }}
            />

            <Button
              text={Strings.submit}
              visible={loading}
              containerStyle={c.Button}
              onPress={() => this.submit()}
            />
          </ScrollableAvoidKeyboard>
        </View>
      </AppRoot>
    );
  }

  submit = () => {
    const { email } = this.state;
    if (!email) {
      Snackbar(Strings.eEmail, Strings.close);
      return;
    }
    if (!Helper.isValideEmail(email)) {
      Snackbar(Strings.eEmail, Strings.close);
      return;
    }
    let request = {
      email: email,
    };
    this.props.fPasswordActions(request);
  };
}

const mapStateToProps = state => {
  return {
    data: state.auth.fPasswordData,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fPasswordActions: data => {
      dispatch(fPasswordActions(data))
    },
    FPasswordClear: data => {
      dispatch(FPasswordClear(data))
    },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(FPassword);
