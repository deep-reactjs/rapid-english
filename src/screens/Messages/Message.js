import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import {Button, Header} from '../../component';
import c from '../../styles/commonStyle';
import axios from 'axios';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Constants, ImageView, Strings} from '../../config/appConstants';
import {Dimens} from '../../config/appConstants';
import Sound from 'react-native-sound';
import { InterstitialAd } from '@react-native-admob/admob';
import { useFocusEffect } from '@react-navigation/native';
import LoaderChat from '../../component/LoaderChat';
import {REACT_APP_CHATGPT_API} from "@env"
const Messages = ({navigation}) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false)
  const copyToClipboard = content => {
    Clipboard.setString(content);
  };
  const [time, setTime] = useState(null);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onFocus = () => {
  //       try {
  //         const interstitial = InterstitialAd.createAd(Constants.INTERSTITIAL__KEY);
  //         const timeoutId = setTimeout(() => {
  //           interstitial.show();
  //         }, 10000);

  //         setTime(timeoutId);
  //       } catch (error) {
  //         console.log('error', error);
  //       }
  //     };

  //     const onBlur = () => {
  //       if (time !== null) {
  //         clearTimeout(time);
  //       }
  //     };

  //     onFocus(); // Call onFocus when the component initially mounts

  //     return () => {
  //       onBlur(); // Call onBlur when the component unmounts
  //     };
  //   }, [navigation, time])
  // );
  // console.log(time)
  // const handleSend = async (text, role) => {
  //   if (inputText.trim() !== '' || messages?.length === 0) {
  //     // Add user's message to the list
  //     // setMessages([...messages, {text: inputText, isUser: true}]);
  //     setInputText('');
  //     const formattedMessagesData =
  //       messages?.map(mes => {
  //         return {role, content: mes?.text};
  //       }) || [];
  //     const allMessages = [
  //       ...formattedMessagesData,
  //       {role: role, content: text},
  //       // Add previous messages here, if available
  //     ];
  //     console.log(allMessages)
  //     try {
  //       const response = await axios.post(
  //         'https://api.openai.com/v1/chat/completions',
  //         {
  //           model: 'gpt-3.5-turbo', // Model name
  //           messages: allMessages,
  //           max_tokens: 50,
  //         },
  //         // {
  //         //   prompt: `I am beginner of learning English. Whatever I type please my correct my English and guide me with better sentence.`,
  //         //   // model: 'gpt-3.5-turbo',
  //         //   // messages: [
  //         //   //   {
  //         //   //     role: 'user',
  //         //   //     content: 'I am beginner of learning English. Whatever I type please my correct my English and guide me with better sentence.',
  //         //   //   },
  //         //   // ],
  //         //   max_tokens: 50,
  //         //   // n: 1,
  //         //   // stop: ".",
  //         // },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer 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`,
  //           },
  //         },
  //         // Add any other required parameters here
  //       );
  //       //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
  //       // Add AI's response to the list
  //       setMessages(prevMessages => [
  //         ...prevMessages,
  //         {text: text, isUser: true},
  //         {
  //           text: response.data.choices[0].message.content,
  //           isUser: false,
  //         },
  //       ]);
  //     } catch (error) {
  //       console.error('Error sending message:', error, error?.response?.data);
  //     }
  //   }
  // };
  const handleSend = async (text, role) => {
    if (inputText.trim() !== '' || messages?.length === 0) {
      setInputText('');

      // Define the prompt message
      const promptMessage = {
        role: 'system', // This could be 'system' or another role you choose
        content:
          'I am a beginner learning English. Please correct my sentences and guide me to construct better ones. If I use a Hindi word, please translate it into English. Also response should not be in double quotes.',
      };
      setMessages(prevMessages => [
        ...prevMessages,
        {text: text, isUser: true},
      ]);
      // Construct the messages array including the prompt
      const allMessages = [
        promptMessage,
        // ...messages?.map(mes => ({
        //   role,
        //   content: mes?.text,
        // })) || [],
        {role: role, content: text},
      ];
      setIsLoading(true);

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
        setIsLoading(false);
        // Add AI's response to the list
        setMessages(prevMessages => [
          ...prevMessages,
          // { text: text, isUser: true },
          {
            text: response.data.choices[0].message.content,
            isUser: false,
          },
        ]);
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
        setIsLoading(false);
        console.error('Error sending message:', error, error?.response?.data);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Header
        text={'Personal Assistant'}
        onBack={() => navigation.goBack()}
        onLogout={() => navigation.navigate('Signin')}
      />
      <ScrollView style={{borderTopWidth: 1, borderTopColor: Colors.light}}>
        <FlatList
          scrollEnabled={false}
          data={messages}
          keyExtractor={item => Math.random()}
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
            isLoading && <View style={{paddingVertical: 12}}><LoaderChat /></View>
          }
          contentContainerStyle={{flex: 1}}
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
                    <Image
                      source={ImageView.logo}
                      style={{height: 40, width: 40, borderRadius: 10}}
                    />
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
                        setCopied(index)
                        copyToClipboard(item.text);
                        setTimeout(() => {
                          setCopied(false)
                        }, 2000)
                      }}>
                     <Icon
                        name={copied === index ? "check-circle-outline" : "content-copy"}
                        size={20}
                        color={copied===index ? Colors.green : Colors.black}
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
          onChangeText={setInputText}
          multiline={true}
          numberOfLines={3}
        />
        <Button
          containerStyle={styles.sendButton}
          text="Send"
          onPress={() => handleSend(inputText, 'user')}
        />
      </View>
    </View>
  );
};

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
    borderColor: Colors.light,
    // paddingVertical: 4,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 16,
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
  }
});

export default Messages;
