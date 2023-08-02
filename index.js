/**
 * @format
 */


import { AppRegistry } from 'react-native';
import App from './src/navigation';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
PushNotification.createChannel(
    {

      channelId: "channel-id", 
      channelName: "RapidEnglish",
      playSound:true,        
      soundName: 'score.wav',
      id:111,
      priority:'high',
      importance: 4,
      vibrate:true,
      vibration:300,

    },
    (created) => console.log(`createChannel returned '${created}'`) 
  );
  // function HeadlessCheck({ isHeadless }) {
//   if (isHeadless) {
//     // App has been launched in the background by iOS, ignore
//     return null;
//   }
//   return <App />;
// }
AppRegistry.registerComponent(appName, () => App);

