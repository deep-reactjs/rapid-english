import React, {Component} from 'react';
import {Ad, AppRoot, Header, Loader} from '../../component';
import c from '../../styles/commonStyle';
import {Screen, Fonts, Dimens} from '../../config/appConstants';
import {StyleSheet, ScrollView, View} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {connect} from 'react-redux';
import {privacy} from '../../redux/actions/contentActions';
const s = StyleSheet.create({
  body: {
    textAlign: 'justify',
    fontSize: Dimens.F16,
  },
  h2: {
    textAlign: 'justify',
    fontSize: Dimens.F16,
    fontFamily: Fonts.SemiBold,
  },
  p: {
    fontFamily: Fonts.Regular,
    fontSize: Dimens.F16,
    padding: Screen.wp(2),
    lineHeight: Dimens.F18,
  },
  a: {
    fontFamily: Fonts.SemiBold,
    color: 'blue',
  },
});
class Policy extends Component {
  constructor(props) {
    super(props);
    this.props.privacy({type: 'privacy-policy'});
  }

  componentDidMount() {
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  render() {
    const {navigation, loading, dataSource} = this.props;
    return (
      <AppRoot>
        <Loader loading={loading} />
        <Header
          text={'Pricy Policy'}
          onBack={() => navigation.goBack()}
          notification={() => navigation.navigate('Notification')}
        />
        <View style={{flex: 1}}>
          <ScrollView style={{padding: 5}}>
            <HTMLView
              value={dataSource ? dataSource.detail : ''}
              stylesheet={s}
            />
          </ScrollView>
        </View>
        <Ad adTypes={'Banner'} />
      </AppRoot>
    );
  }
}
const mapStateToProps = state => {
  return {
    dataSource: state.content.privacyData.data,
    loading: state.content.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    privacy: data => {
      dispatch(privacy(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Policy);
