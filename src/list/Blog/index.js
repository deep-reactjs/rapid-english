import {
  InterstitialAd
} from '@react-native-admob/admob';
import axios from 'axios';
import moment from 'moment/moment';
import React from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { Ad, Button, Snackbar } from '../../component';
import {
  Colors,
  Constants,
  Fonts,
  Screen
} from '../../config/appConstants';
import c from '../../styles/commonStyle';
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
    rewardAd: InterstitialAd.createAd(Constants.INTERSTITIAL__KEY, {
      loadOnMounted: true,
      loadOnDismissed: true,
    }),
  };

  // componentDidMount() {
  //   Screen.OrientationChange(this);
  //   this.state.rewardAd.addEventListener('adDismissed', () => {
  //     this.handleDownloadFile(this.props.item?.pdf_auto, this.props.item?.id);
  //   });
  // }
  // componentWillUnmount() {
  //   this.state.rewardAd.removeAllListeners();
  // }
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

      const pdfName = 'rapid-english-blog' + id + '.pdf';
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
      if (Platform.OS === 'ios') {
        setTimeout(() => {
          RNFetchBlob.ios.openDocument(path);
        }, 1000);
      }
      if(Platform.OS === "android"){
        RNFetchBlob.android.addCompleteDownload({
          title:'rapid-english-blog' + id + moment().format('DDMMYY-hhmmss') + '.pdf',
          description: 'Download complete',
          mime: 'application/pdf',
          path: `${dirToSave}/${pdfName}`,
          showNotification: true,
        })
      }
      console.log('PDF downloaded to:', path);
      setTimeout(async() => {
        await this.state.rewardAd.load({
          serverSideVerificationOptions: {
            userId: id,
          },
        });
        await this.state.rewardAd.show();
      }, 1500)
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
            containerStyle={[c.Button, {marginBottom: Screen.hp(2.5)}]}
            onPress={async() => {
            
                      try {
                        if(Platform.OS == "android"){
                        const granted = await PermissionsAndroid?.requestMultiple(
                          [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
                          {
                            title: 'storage title',
                            message: 'storage_permission',
                          },
                        );
                        console.log('granted', granted[PermissionsAndroid?.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);
                        if (granted[PermissionsAndroid?.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid?.RESULTS?.GRANTED || granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid?.RESULTS?.GRANTED) {
                          this.setState({downloading: rowData?.id});
                          this.handleDownloadFile(this.props.item?.pdf_auto, this.props.item?.id);
                        } else {
                          const mediaPermissions = await PermissionsAndroid.request(
                              'android.permission.READ_MEDIA_IMAGES',
                            {
                              title: 'storage title',
                              message: 'storage_permission',
                            },
                          );
                          if (mediaPermissions === PermissionsAndroid.RESULTS.GRANTED) {
                            this.setState({downloading: rowData?.id});
                            this.handleDownloadFile(this.props.item?.pdf_auto, this.props.item?.id);
                            
                          } else {
                            Snackbar("Storage permission not allowed")
                          }
                        }}else{
                          this.setState({downloading: rowData?.id});
                          this.handleDownloadFile(this.props.item?.pdf_auto, this.props.item?.id);
                        }
                      } catch (err) {
                        console.log({err});
                        Snackbar('Please try again later');
                        this.setState({downloading: false});
                      }
            }}
          />

          {/* </View> */}
        </TouchableOpacity>
        {(parseInt(rowID) + 1) % 2 == 0 && <Ad adTypes={'Interstitial'} />}
      </>
    );
  }
}
// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Platform,
//   Alert,
// } from 'react-native';
// import c from '../../styles/commonStyle';
// import {Colors, Screen, Fonts, Constants} from '../../config/appConstants';
// import {Ad, Button, Snackbar} from '../../component';
// import RNFetchBlob from 'rn-fetch-blob';
// import axios from 'axios';
// import {
//   InterstitialAd,
//   RewardedAd,
//   useRewardedAd,
// } from '@react-native-admob/admob';
// import {useNavigation} from '@react-navigation/native';

// const s = StyleSheet.create({
//   iconBg: {
//     height: 30,
//     width: 30,
//     backgroundColor: Colors.light_gray,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   lightTxt: {
//     fontFamily: Fonts.Regular,
//     color: Colors.dark_gray,
//   },
// });

// const DiscountList = ({fileURL, index, item, onPress}) => {
//   const [downloading, setDownloading] = useState(false);
//   // const [rewardAd, setRewardAd] = useState(null);
//   const navigation = useNavigation();
//   const interstitial = InterstitialAd.createAd(Constants.INTERSTITIAL__KEY, {
//     loadOnMounted: true,
//     loadOnDismissed: true,
//   });
//   console.log({item})
//   useEffect(() => {
//     interstitial.addEventListener('adDismissed', () => {
//       handleDownloadFile(item?.pdf_auto, item?.id);
//     });
//     return () => {
//       interstitial.removeAllListeners();
//     };
//   }, [interstitial]);
//   // useEffect(() => {
//   //   if(adDismissed){
//   //     handleDownloadFile(item?.pdf_auto, item?.id);
//   //   }
//   // }, [adDismissed, item]);
//   // useEffect(() => {
//   //   console.log({adLoadError})
//   //   if(adLoadError && downloading){
//   //     setDownloading(false)
//   //     Snackbar('Please try again later');
//   //   }
//   // }, [downloading, adLoadError])
//   const textView = (key, value) => (
//     <View style={c.flatRow}>
//       <Text style={c.flatTBold}>{key}</Text>
//       <Text style={c.flatT}>:</Text>
//       <Text style={c.flatTNormal}>{value}</Text>
//     </View>
//   );
//   const blobToBase64 = async blob => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64String = reader.result.split(',')[1];
//         resolve(base64String);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };
//   const handleDownloadFile = async (url, id) => {
//     try {
//       setDownloading(id);
//       const pdfName = 'rapid-english-blog' + id + '.pdf';
//       const pdfUrl = url;
//       const response = await axios.get(pdfUrl, {responseType: 'blob'});
//       const base64Data = await blobToBase64(response.data);
//       const path = `${RNFetchBlob.fs.dirs.DownloadDir}/${pdfName}`;
//       await RNFetchBlob.fs.writeFile(path, base64Data, 'base64');
//       setDownloading(false);
//       Snackbar('File downloaded successfully');
//       if (Platform.OS === 'ios') {
//         setTimeout(() => {
//           RNFetchBlob.ios.openDocument(path);
//         }, 1000);
//       }
//       console.log('PDF downloaded to:', path);
//     } catch (error) {
//       console.log({error});
//       Snackbar('Please try again later');
//       setDownloading(false);
//     }
//   };

//   const handleDownloadButtonPress = async () => {
//     try {
//       setDownloading(item?.id);
//       await interstitial.show();
//     } catch (err) {
//       console.log({err});
//       Snackbar('Please try again later');
//       setDownloading(false);
//     }
//   };

//   return (
//     <>
//       <TouchableOpacity
//         activeOpacity={0.9}
//         style={{
//           marginTop: index == 0 ? 0 : 0,
//           paddingVertical: 0,
//           borderBottomWidth: 1,
//           borderBottomColor: Colors.light_gray,
//           backgroundColor: 'white',
//           paddingHorizontal: Screen.wp(3.8),
//         }}>
//         <Text onPress={onPress} style={s.lightTxt}>
//           {item.time}
//         </Text>
//         <TouchableOpacity
//           onPress={onPress}
//           style={{flex: 1, bottom: Screen.hp(0.8)}}>
//           {item.title ? <Text style={c.textBold}>{item.name}</Text> : null}
//           <Image
//             resizeMode="cover"
//             style={{
//               width: '99%',
//               height: Screen.hp(20),
//               marginVertical: Screen.hp(1),
//               borderRadius: Screen.wp(1),
//               backgroundColor: Colors.light_gray,
//             }}
//             source={{uri: fileURL + item.image}}
//           />
//         </TouchableOpacity>
//         <Button
//           text={'Download'}
//           visible={downloading}
//           containerStyle={[c.Button, {marginBottom: Screen.hp(2.5)}]}
//           onPress={handleDownloadButtonPress}
//         />
//       </TouchableOpacity>
//       {(parseInt(index) + 1) % 2 == 0 && <Ad adTypes={'Interstitial'} />}
//     </>
//   );
// };

// export default DiscountList;
