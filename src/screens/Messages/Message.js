// import {REACT_APP_CHATGPT_API} from '@env';
// import {InterstitialAd} from '@react-native-admob/admob';
// import Clipboard from '@react-native-community/clipboard';
// import axios from 'axios';
// import React, {useRef, useState} from 'react';
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   Keyboard,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Sound from 'react-native-sound';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
// import {AppRoot, Button, Header} from '../../component';
// import LoaderChat from '../../component/LoaderChat';
// import {Colors, Constants, ImageView} from '../../config/appConstants';
// import c from '../../styles/commonStyle';

// const Messages = ({navigation}) => {
//   const [inputText, setInputText] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const inputRef = useRef(null);
//   const copyToClipboard = content => {
//     Clipboard.setString(content);
//   };
//   const interstitial = InterstitialAd.createAd(Constants.INTERSTITIAL__KEY, {
//     requestOptions: {
//       serverSideVerificationOptions: {
//         userId: '123',
//       },
//     },
//   });
//   // useEffect(() => {
//   //   console.log('useEffect called');
//   //   const interval = setTimeout(async () => {
//   //     console.log('use effect called');
//   //     await interstitial?.load();
//   //     await interstitial?.show();
//   //   }, 45000);
//   //   return () => {
//   //     clearTimeout(interval);
//   //   };
//   // }, [interstitial]);

//   const handleSend = async (text, role) => {
//     console.log(inputRef.current.value);
//     Keyboard.dismiss();
//     inputRef.current.clear();
//     if (inputText.trim() !== '' || messages?.length === 0) {
//       const promptMessage = {
//         role: 'system',
//         content:
//           'I am a beginner learning English. Please correct my sentences and guide me to construct better ones. If I use a Hindi word, please translate it into English. Also response should not be in double quotes.',
//       };
//       setMessages(prevMessages => [
//         ...prevMessages,
//         {text: text, isUser: true},
//       ]);
//       const allMessages = [promptMessage, {role: role, content: text}];
//       setIsLoading(true);

//       var beep = new Sound('messagesent.mp3', Sound.MAIN_BUNDLE, error => {
//         if (error) {
//           console.log('failed to load the sound', error);
//           return;
//         }
//         beep.play(async success => {
//           console.log('success');
//         });
//       });

//       try {
//         const response = await axios.post(
//           'https://api.openai.com/v1/chat/completions',
//           {
//             model: 'gpt-3.5-turbo',
//             messages: allMessages,
//             max_tokens: 200,
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${REACT_APP_CHATGPT_API}`,
//             },
//           },
//         );
//         setIsLoading(false);
//         // Add AI's response to the list
//         setMessages(prevMessages => [
//           ...prevMessages,
//           // { text: text, isUser: true },
//           {
//             text: response.data.choices[0].message.content,
//             isUser: false,
//           },
//         ]);
//         var beep = new Sound(
//           'messagereceived.mp3',
//           Sound.MAIN_BUNDLE,
//           error => {
//             if (error) {
//               console.log('failed to load the sound', error);
//               return;
//             }
//             beep.play(async success => {
//               console.log('success');
//             });
//           },
//         );
//       } catch (error) {
//         setIsLoading(false);
//         console.error('Error sending message:', error, error?.response?.data);
//       }
//     }
//   };
//   return (
//     <KeyboardAvoidingView
//       style={{flex: 1}}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
//       <AppRoot>
//         <Header
//           text={'Personal Assistant'}
//           onBack={() => navigation.goBack()}
//           onLogout={() => navigation.navigate('Signin')}
//         />
//         {/* <ScrollView style={{borderTopWidth: 1, borderTopColor: Colors.light}}> */}
//         <FlatList
//           scrollEnabled={false}
//           data={messages}
//           keyExtractor={item => Math.random()}
//           ListEmptyComponent={() => (
//             <View
//               style={{
//                 height: Dimensions.get('window').height / 1.5,
//                 justifyContent: 'center',
//               }}>
//               <Icon
//                 name="chat"
//                 size={60}
//                 style={{alignSelf: 'center', color: Colors.primary}}
//               />
//               <Text
//                 style={[
//                   c.textBold,
//                   {color: Colors.dark_gray, textAlign: 'center'},
//                 ]}>
//                 Level Up Your English: Sentence Improvement for Clear
//                 Communication.{'\n'}
//                 Type below and see the results
//               </Text>
//             </View>
//           )}
//           ListFooterComponent={
//             isLoading && (
//               <View style={{paddingVertical: 12}}>
//                 <LoaderChat />
//               </View>
//             )
//           }
//           contentContainerStyle={{flex: 1}}
//           renderItem={({item, index}) => (
//             <View>
//               {item?.isUser ? (
//                 <View style={styles.messageContainer}>
//                   <Text style={[styles.messageText, {color: Colors.black}]}>
//                     {item.text}
//                   </Text>
//                 </View>
//               ) : (
//                 <View style={styles.responseContainer}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'flex-start',
//                       flexWrap: 'wrap',
//                     }}>
//                     <Image
//                       source={ImageView.logo}
//                       style={{height: 40, width: 40, borderRadius: 10}}
//                     />
//                     <Text
//                       style={[
//                         styles.messageText,
//                         {color: Colors.black, flex: 1, paddingLeft: 8},
//                       ]}>
//                       {item.text}
//                     </Text>
//                   </View>
//                   {!item?.isUser && (
//                     <TouchableOpacity
//                       style={styles.copyContent}
//                       onPress={() => {
//                         setCopied(index);
//                         copyToClipboard(item.text);
//                         setTimeout(async () => {
//                           await interstitial?.load();
//                           await interstitial?.show();
//                           setCopied(false);
//                         }, 2000);
//                       }}>
//                       <Icon
//                         name={
//                           copied === index
//                             ? 'check-circle-outline'
//                             : 'content-copy'
//                         }
//                         size={20}
//                         color={copied === index ? Colors.green : Colors.black}
//                       />
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               )}
//             </View>
//           )}
//         />
//         {/* </ScrollView> */}
//         <View style={styles.inputContainer}>
//           <TextInput
//             ref={inputRef}
//             style={styles.input}
//             placeholder="Type or paste your text here"
//             value={inputText}
//             onChangeText={e => {
//               setInputText(e);
//             }}
//             multiline={true}
//             textAlignVertical="top"
//           />
//           <Button
//             containerStyle={styles.sendButton}
//             text="Send"
//             onPress={() => handleSend(inputRef.current.value, 'user')}
//           />
//         </View>
//         {/* <View>
//           <BannerAd
//             onAdFailedToLoad={error => console.error(error)}
//             size={BannerAdSize.ADAPTIVE_BANNER}
//             unitId={Constants.BANNER_KEY}
//           />
//         </View> */}
//       </AppRoot>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//     justifyContent: 'space-between',
//   },
//   responseContainer: {
//     backgroundColor: '#f7f7f8',
//     padding: 8,
//     // marginVertical: 4,
//     borderRadius: 8,
//     // marginRight: '20%',
//     // maxWidth: '70%',
//   },
//   messageContainer: {
//     backgroundColor: '#f0f0f0',
//     padding: 16,
//     // marginVertical: 4,
//     // borderRadius: 8,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: Colors.light,
//     // marginLeft: '20%',

//     // maxWidth: '70%',
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: Colors.light,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 8,
//     fontSize: 16,
//     maxHeight: 100,
//   },
//   copyContent: {
//     alignSelf: 'flex-end',
//     padding: 4,
//     borderRadius: 100,
//   },
//   sendButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//   },
// });

// export default Messages;

// class component
import {REACT_APP_CHATGPT_API} from '@env';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
} from '@react-native-admob/admob';
import Clipboard from '@react-native-community/clipboard';
import axios from 'axios';
import React, {Component, createRef, PureComponent} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppRoot, Button, Header} from '../../component';
import LoaderChat from '../../component/LoaderChat';
import {Colors, Constants} from '../../config/appConstants';
import c from '../../styles/commonStyle';
class Logo extends PureComponent {
  render() {
    return (
      <Image
        source={require('../../assets/as.png')}
        style={{height: 40, width: 40, borderRadius: 10}}
      />
    );
  }
}
class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: '',
      messages: [],
      isLoading: false,
      copied: false,
      time: null,

      interstitial: InterstitialAd.createAd(Constants.INTERSTITIAL__KEY, {
        loadOnDismissed: true,
      }),
    };
  }
  scrollViewRef = createRef();
  componentDidMount() {
    const {navigation} = this.props;
    const interval = setInterval(() => {
      this.state.interstitial.show();
    }, 45000);
    this.setState({time: interval});
  }

  componentWillUnmount() {
    const {time} = this.state;
    clearInterval(time);
  }

  copyToClipboard = content => {
    Clipboard.setString(content);
  };

  handleSend = async (text, role) => {
    const {inputText, messages} = this.state;
    Keyboard.dismiss();
    if (inputText.trim() !== '' || messages?.length === 0) {
      this.setState({inputText: ''});

      const promptMessage = {
        role: 'system',
        content:
          'I am a beginner learning English. Please correct my sentences and guide me to construct better ones. If I use a Hindi word, please translate it into English. Also response should not be in double quotes.',
      };
      const allMessages = [promptMessage, {role: role, content: text}];
      this.setState({isLoading: true});

      var beep = new Sound('messagesent.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        beep.play(async success => {
          console.log('success');
        });
      });

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: allMessages,
            max_tokens: 200,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${REACT_APP_CHATGPT_API}`,
            },
          },
        );
        this.setState({isLoading: false});
        this.setState(prevState => ({
          messages: [
            ...prevState.messages,
            {text: text, isUser: true},
            {text: response.data.choices[0].message.content, isUser: false},
          ],
        }));
        this?.scrollViewRef?.scrollToEnd({animated: true});
        var beep = new Sound(
          'messagereceived.mp3',
          Sound.MAIN_BUNDLE,
          error => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
            beep.play(async success => {
              console.log('success');
            });
          },
        );
      } catch (error) {
        this.setState({isLoading: false});
        console.error('Error sending message:', error, error?.response?.data);
      }
    }
  };

  render() {
    const {inputText, messages, isLoading, copied} = this.state;
    const {navigation} = this.props;

    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <AppRoot>
          <Header
            text={'Personal Assistant'}
            onBack={() => navigation.goBack()}
            onLogout={() => navigation.navigate('Signin')}
          />
          <ScrollView
            ref={ref => {
              this.scrollViewRef = ref;
            }}
            style={{borderTopWidth: 1, borderTopColor: Colors.light}}>
            <FlatList
              scrollEnabled={false}
              data={messages}
              // keyExtractor={item => Math.random()}
              ListEmptyComponent={() => (
                <View
                  style={{
                    height: Dimensions.get('window').height / 1.3,
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="chat"
                    size={60}
                    style={{alignSelf: 'center', color: Colors.primary}}
                  />
                  <Text
                    style={[
                      c.textBold,
                      {color: Colors.dark_gray, textAlign: 'center'},
                    ]}>
                    Level Up Your English: Sentence Improvement for Clear
                    Communication.{'\n'}
                    Type below and see the results
                  </Text>
                </View>
              )}
              ListFooterComponent={
                isLoading && (
                  <View style={{paddingVertical: 12}}>
                    <LoaderChat />
                  </View>
                )
              }
              contentContainerStyle={{
                flex: 1,
              }}
              renderItem={({item, index}) => (
                <View>
                  {item?.isUser ? (
                    <View style={styles.messageContainer}>
                      <Text style={[styles.messageText, {color: Colors.black}]}>
                        {item.text}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.responseContainer}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          flexWrap: 'wrap',
                        }}>
                        <Logo />
                        <Text
                          style={[
                            styles.messageText,
                            {color: Colors.black, flex: 1, paddingLeft: 8},
                          ]}>
                          {item.text}
                        </Text>
                      </View>
                      {!item?.isUser && (
                        <TouchableOpacity
                          style={styles.copyContent}
                          onPress={() => {
                            this.setState({copied: index});
                            this.copyToClipboard(item.text);
                            setTimeout(() => {
                              this.state.interstitial.show();
                              this.setState({copied: false});
                            }, 2000);
                          }}>
                          <Icon
                            name={
                              copied === index
                                ? 'check-circle-outline'
                                : 'content-copy'
                            }
                            size={20}
                            color={
                              copied === index ? Colors.green : Colors.black
                            }
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              )}
            />
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              value={inputText}
              onChangeText={text => this.setState({inputText: text})}
              multiline={true}
              numberOfLines={3}
            />
            <Button
              containerStyle={styles.sendButton}
              text="Send"
              onPress={() => this.handleSend(inputText, 'user')}
            />
          </View>
          <View>
            <BannerAd
              onAdFailedToLoad={error => console.error(error)}
              size={BannerAdSize.ADAPTIVE_BANNER}
              unitId={Constants.BANNER_KEY}
            />
          </View>
        </AppRoot>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  responseContainer: {
    backgroundColor: '#f7f7f8',
    padding: 8,
    // marginVertical: 4,
    borderRadius: 8,
    // marginRight: '20%',
    // maxWidth: '70%',
  },
  messageContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    // marginVertical: 4,
    // borderRadius: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light,
    // marginLeft: '20%',

    // maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  copyContent: {
    alignSelf: 'flex-end',
    padding: 4,
    borderRadius: 100,
  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
});

export default Messages;
