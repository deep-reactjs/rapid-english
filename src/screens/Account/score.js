import React, {Component} from 'react';
import {Ad, AppRoot, Header, Loader} from '../../component';
import c from '../../styles/commonStyle';
import {Screen, Fonts, Dimens, Storage_Key} from '../../config/appConstants';
import {StyleSheet, ScrollView} from 'react-native';
import {Helper, PrefManager} from '../../utils';
import {connect} from 'react-redux';
import Confetti from 'react-native-confetti';
import {scoreActions} from '../../redux/actions/scoreActions';
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
    padding: Screen.wp(2),
    lineHeight: Dimens.F18,
  },
  a: {
    fontFamily: Fonts.Regular,
    color: 'blue',
  },
});
class Score extends Component {
  constructor(props) {
    super(props);
    props.navigation.addListener('focus', async () => {
      PrefManager.getValue(Storage_Key.id).then(id => {
        props.scoreActions({id: id});
      });
    });
  }

  componentDidMount() {
    if (this._confettiView) {
      this._confettiView.startConfetti();
    }
    Screen.OrientationChange(this);
  }

  componentWillUnmount() {
    this._confettiView.stopConfetti();
    Screen.OrientationListener();
  }

  render() {
    const {navigation, loading, dataSource} = this.props;
    return (
      <AppRoot>
        <Loader loading={loading} />
        <Header
          text={'Score'}
          onBack={() => navigation.goBack()}
          notification={() => navigation.navigate('Notification')}
        />

        <Ad adTypes={'Banner'} />
        {/* <Confetti ref={(node) => this._confettiView = node}/> */}
      </AppRoot>
    );
  }
}
const mapStateToProps = state => {
  return {
    dataSource: state.score.scoreData,
    loading: state.score.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    scoreActions: data => {
      dispatch(scoreActions(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Score);
