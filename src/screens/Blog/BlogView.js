import React, { useState, useEffect } from 'react';
import { View, PermissionsAndroid } from 'react-native';
import { AppRoot, Header, Loader } from '../../component';
import c from '../../styles/commonStyle';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import { Screen, Fonts, Dimens, Constants } from "../../config/appConstants";
import { InterstitialAd } from '@react-native-admob/admob';

const BlogView = ({ navigation, route }) => {
    const [pdf, setPdf] = useState('');
    const [loading, setLoading] = useState(true);
    const [interstitialAd] = useState(InterstitialAd.createAd(Constants.INTERSTITIAL__KEY));

    useEffect(() => {
        const downloadHistory = async () => {
            const fileUrl = route.params.data.pdf_auto;
            const { config, fs } = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            let date = new Date();
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    path: PictureDir + '/pdf' + route.params.data.id,
                    description: '',
                },
            };
            try {
                const res = await config(options).fetch('GET', fileUrl);
                setPdf(res.data);
                setLoading(false);
                console.log('res -> ', res);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        const onFocus = async () => {
            if (Platform.OS === 'ios') {
                setLoading(true);
                downloadHistory();
            } else {
                try {
                    // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
                    // setLoading(true);
                    // downloadHistory();
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        {
                            title: 'storage title',
                            message: 'storage_permission',
                        },
                    );
                    console.log('granted', granted)
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        setLoading(true);
                        downloadHistory();
                    }
                } catch (err) {
                   
                    setLoading(false);
                    console.log('error', err);
                }
            }
        };

       

     onFocus();
        Screen.OrientationChange();

        return () => {
            navigation.removeListener('focus', onFocus);
            // Screen.OrientationListener(); // Uncomment this if needed
        };
    }, []);
    const goBack = () => {
        interstitialAd.show();
        navigation.goBack();
    };
    return (
        <AppRoot>
            <Loader loading={loading}/>
            <View style={c.flexStyle}>
                <Header
                    text={route.params.data.name}
                    onBack={() => goBack()}
                />
                {pdf ? (
                    <Pdf
                        source={{ uri: 'file://' + pdf }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link presse: ${uri}`);
                        }}
                        onLoadProgress={(p) => {
                            console.log('p', p);
                        }}
                        style={{ flex: 1 }}
                    />
                ) : null}
            </View>
        </AppRoot>
    );
};

export default BlogView;
