import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import { Constants } from "../../config/appConstants";
import {BannerAd,InterstitialAd,TestIds, BannerAdSize, } from '@react-native-admob/admob';

const INTERSTITIAL__KEY = Constants.BANNER_KEY;
const BANNER_KEY = Constants.BANNER_KEY;


  // const REWARDED_INTERSTITIAL__KEY  = __DEV__
  // ? 'ca-app-pub-2234408096020602~5967631681'
  // : 'ca-app-pub-2234408096020602~5967631681';

  // const REWARDED_KEY  = __DEV__
  // ? 'ca-app-pub-2234408096020602~5967631681'
  // : 'ca-app-pub-2234408096020602~5967631681';


const styles = StyleSheet.create({
  banner: {
    alignSelf: 'center',
  },
});
export default class Banner extends Component {
  render() {
    return <View>{this.renderList(this.props.adTypes)}</View>;
  }
  renderList = item => {
    switch (item) {
      case 'Banner':
        return (
          <BannerAd
            style={styles.banner}
            size={BannerAdSize.ADAPTIVE_BANNER}
            unitId={BANNER_KEY}
          />
        );
      case 'Interstitial':
        return (
          <BannerAd
            style={styles.banner}
            size={BannerAdSize.MEDIUM_RECTANGLE}
            unitId={INTERSTITIAL__KEY}
          />
        );
      //   case 'Rewarded_Interstitial':
      //   return (
      //     <BannerAd
      //       style={styles.banner}
      //       size={BannerAdSize.MEDIUM_RECTANGLE}
      //       unitId={REWARDED_INTERSTITIAL__KEY}
      //     />
      //   ); 
      //   case 'Rewarded':
      //   return (
      //     <BannerAd
      //       style={styles.banner}
      //       size={BannerAdSize.ADAPTIVE_BANNER}
      //       unitId={REWARDED_KEY}
      //     />
      //   ); 
      //  case 'test':
      //   return (
      //     <BannerAd
      //       style={styles.banner}
      //       size={BannerAdSize.MEDIUM_RECTANGLE}
      //       unitId={INTERSTITIAL__KEY}
      //     />
      //   ); 
    }
  };
}