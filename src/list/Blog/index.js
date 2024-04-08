import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import c from '../../styles/commonStyle';
import {
  Colors,
  ImageView,
  Screen,
  Fonts,
  Constants,
} from '../../config/appConstants';
import {Ad, Button, Snackbar} from '../../component';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import {
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
} from '@react-native-admob/admob';
import moment from 'moment/moment';
const s = StyleSheet.create({
  iconBg: {
    height: 30,
    width: 30,
    backgroundColor: Colors.light_gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightTxt: {
    fontFamily: Fonts.Regular,
    color: Colors.dark_gray,
  },
});

export default class discountList extends React.Component {
  state = {
    refresh: false,
    downloading: false,
    rewardAd: RewardedAd.createAd(Constants.REWARDED),
  };
  componentDidMount() {
    Screen.OrientationChange(this);
    this.state.rewardAd.addEventListener('adDismissed', () => {
      this.handleDownloadFile(this.props.item?.pdf_auto, this.props.item?.id);
    });
  }
  componentWillUnmount() {
    this.state.rewardAd.removeAllListeners();
  }
  textView = (key, value) => (
    <View style={c.flatRow}>
      <Text style={c.flatTBold}>{key}</Text>
      <Text style={c.flatT}>:</Text>
      <Text style={c.flatTNormal}>{value}</Text>
    </View>
  );
  blobToBase64 = async blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  handleDownloadFile = async (url, id) => {
    // Get file name from URL

    try {
      this.setState({downloading: id});

      const pdfName = 'rapid-english-blog' + id  + '.pdf';
      const pdfUrl = url;
      const {dirs} = RNFetchBlob.fs;
      let dirToSave = Platform.select({
        ios: dirs.DocumentDir,
        android: dirs.DownloadDir,
      });
      // Download the PDF file using Axios
      const response = await axios.get(pdfUrl, {
        responseType: 'blob',
      });
      const base64Data = await this.blobToBase64(response.data);
      console.log(base64Data);
      // Save the PDF file using RNFetchBlob
      const path = `${dirToSave}/${pdfName}`;
      await RNFetchBlob.fs.writeFile(path, base64Data, 'base64');
      
      this.setState({downloading: false});
      Snackbar('File downloded successfully');
      if(Platform.OS === "ios"){
        setTimeout(() => {
          RNFetchBlob.ios.openDocument(path)
        }, 1000)
        }
      console.log('PDF downloaded to:', path);
    } catch (error) {
      console.log({error});
      Snackbar('Please try again later');
      this.setState({downloading: false});
    }
  };
  render() {
    const {fileURL} = this.props;
    const rowID = this.props.index;
    const rowData = this.props.item;
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            {
              marginTop: rowID == 0 ? 0 : 0,
              paddingVertical: 0,
              borderBottomWidth: 1,
              borderBottomColor: Colors.light_gray,
              backgroundColor: 'white',
              paddingHorizontal: Screen.wp(3.8),
            },
          ]}>
          <Text onPress={() => this.props.onPress()} style={s.lightTxt}>
            {rowData.time}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.onPress()}
            style={{flex: 1, bottom: Screen.hp(0.8)}}>
            {rowData.title ? (
              <Text style={c.textBold}>{rowData.name}</Text>
            ) : null}
            <Image
              resizeMode="cover"
              style={{
                width: '99%',
                height: Screen.hp(20),
                marginVertical: Screen.hp(1),
                borderRadius: Screen.wp(1),
                backgroundColor: Colors.light_gray,
              }}
              source={{uri: fileURL + rowData.image}}
            />
          </TouchableOpacity>
          {/* <View style={[c.flexRowJus, {paddingBottom: 10}]}> */}
            {/* <Text
              onPress={() => this.props.onPress()}
              style={[c.textNormal, {flex: 1}]}>
              {rowData.title}
            </Text> */}
                 <Button
            text={'Download'}
            visible={this.state.downloading}
            containerStyle={[c.Button, { marginBottom: Screen.hp(2.5) }]}
            onPress={() => {
              Alert.alert(
                'Confirmation',
                'To download the PDF, watch the ad...',
                [
                  {
                    text: 'No',
                    onPress: () => console.log('no'),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: async () => {
                      try {
                        this.setState({downloading: rowData?.id});
                        await this.state.rewardAd.load();
                        await this.state.rewardAd.show();
                      } catch (err) {
                        console.log({err})
                        Snackbar('Please try again later');
                        this.setState({downloading: false});
                      }
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
          />
            
          {/* </View> */}
        </TouchableOpacity>

        {(parseInt(rowID) + 1) % 2 == 0 && <Ad adTypes={'Interstitial'} />}
      </>
    );
  }
}
