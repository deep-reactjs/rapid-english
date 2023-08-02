import Snackbar from 'react-native-snackbar';
import { Colors } from '../config/appConstants';
function Snack(msg,action,onPress) {
    Snackbar.show({
        text: msg,
        backgroundColor:Colors.secondary,
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text:action,
          textColor: 'white',
          onPress: () =>onPress,
        },
    })
}

export default Snack;