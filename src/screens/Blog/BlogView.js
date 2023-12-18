import React, { Component } from 'react'
import { View, PermissionsAndroid } from 'react-native'
import { AppRoot, Header, Loader } from '../../component';
import c from '../../styles/commonStyle';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
// var RNFetchBlob;
// https://stackoverflow.com/questions/44546199/how-to-download-a-file-with-react-native
import { Screen, Fonts, Dimens, Constants } from "../../config/appConstants";
import { InterstitialAd } from '@react-native-admob/admob';
class BlogView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pdf: '',
            loading: true,
            InterstitialAd: InterstitialAd.createAd(Constants.INTERSTITIAL__KEY),
        }
        props.navigation.addListener('focus', async () => {
            if (Platform.OS === 'ios') {
                this.setState({loading:true})
                this.downloadHistory();
            } else {
                try {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            title: 'storage title',
                            message: 'storage_permission',
                        },
                    ).then(granted => {
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                            this.setState({loading:true})
                            this.downloadHistory();
                        }
                    });
                } catch (err) {
                    this.setState({loading:false})
                    console.log('error', err);
                }
            }
        })
    }
    async downloadHistory() {
        const fileUrl = this.props.route.params.data.pdf_auto;
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let date = new Date();
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                path:
                    PictureDir +
                    '/pdf' +
                    this.props.route.params.data.id,
                description: '',
            },
        };
        config(options)
            .fetch('GET', fileUrl)
            .then((res) => {
                this.setState({
                    pdf: res.data,loading:false
                })
                console.log('res -> ', res);
            }).catch(e=>{
                this.setState({loading:false})
            });
    }
    componentDidMount() {
        Screen.OrientationChange(this);
    }

    // componentWillUnmount() {
    //     Screen.OrientationListener();
    // }
    goBack = () => {
     this.state.InterstitialAd.show();
        this.props.navigation.goBack();
      };
    render() {
        const { navigation } = this.props;
        const { loading, pdf } = this.state;
        const { data } = this.props.route.params;
        return (
            <AppRoot>
                <Loader loading={loading}/>
                <View style={c.flexStyle}>
                    <Header
                        text={data.name}
                        onBack={() => this.goBack()}
                    />
                    {pdf ?
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
                        : null}

                </View>
            </AppRoot>
        )
    }
}

export default BlogView;
