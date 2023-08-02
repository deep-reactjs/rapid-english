import React, {Component} from 'react';
import {Ad, AppRoot, Header, Loader} from '../../component';
import c from '../../styles/commonStyle';
import {Screen, Fonts, Dimens, Colors} from '../../config/appConstants';
import {StyleSheet, ScrollView, View} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {connect} from 'react-redux';
import {aboutUs} from '../../redux/actions/contentActions';
const s = StyleSheet.create({
  body: {
    textAlign: 'justify',
    fontSize: Dimens.F16,
  },
  h2: {
    textAlign: 'justify',
    fontSize: Dimens.F16,
  },
  p: {
    fontFamily: Fonts.Regular,
    fontSize: Dimens.F16,
    padding: Screen.wp(1),
    color:Colors.black
    // lineHeight: Dimens.F18,
  },
  a: {
    fontFamily: Fonts.Regular,
    color: 'blue',
  },
  b: {
    fontFamily: Fonts.Bold,
    fontSize: Dimens.F16,
  },
});
class About extends Component {
  constructor(props) {
    super(props);
    this.props.aboutUs({type: 'about-us'});
  }

  componentDidMount() {
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    Screen.OrientationListener();
  }

  render() {
    const {navigation, loading, dataSource} = this.props;
    console.log('dataSource', dataSource);
    return (
      <AppRoot>
        <Loader loading={loading} />
        <Header
          text={'About us'}
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
    dataSource: state.content.aboutData.data,
    loading: state.content.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    aboutUs: data => {
      dispatch(aboutUs(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(About);
