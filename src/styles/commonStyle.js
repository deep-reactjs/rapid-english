import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Fonts, Dimens, Colors, Screen} from '../config/appConstants';
const {width, height} = Dimensions.get('window');
const commonStyle = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexCenter:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  flexStyle: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  flexRowJus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  textBold: {
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.F18,
    color: Colors.black,
  },
  textNormal: {
    fontFamily: Fonts.Regular,
    color: Colors.secondary,
    fontSize: Dimens.F16,
  },
  textNormal1: {
    fontFamily: Fonts.Medium,
    color: Colors.black,
    fontSize: Dimens.F16,
  },
  textLight: {
    fontFamily: Fonts.Light,
    color: Colors.secondary,
    fontSize: Dimens.F14,
  },
  loginInput: {
    width: Screen.wp('85%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    alignSelf: 'center',
    paddingHorizontal: Screen.wp(2),
  },
  logininputStyle: {
    paddingVertical: Platform.OS == 'ios'? 10: 0
  },
  profileInput: {
    width: Screen.wp('90%'),
    height: Screen.hp(6),
    alignSelf: 'center',
    paddingHorizontal: Screen.wp(2),
    marginTop: Screen.hp(4),
    
  },
  diputStyle: {
    width: Screen.wp('100%'),
    height: Screen.hp(10),
    alignSelf: 'center',
    paddingHorizontal: Screen.wp(2),
    
  },
  dtextInput: {
    borderWidth: 1,
    borderRadius: 6,
    marginTop: Screen.hp(2),
    paddingHorizontal:Screen.wp(1.5),
    backgroundColor:'white',
    paddingVertical: Platform.OS == 'ios'? 10: 0
  },
  Button: {
    marginHorizontal: Screen.hp('6%'),
    borderRadius: Screen.hp('3%'),
    marginVertical: Screen.hp('2%'),
    paddingVertical: Screen.hp('1.7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  McqButton: {
    borderRadius: Screen.hp('4%'),
    marginVertical: Screen.hp('0.9%'),
    paddingVertical: Screen.hp('1.7%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    elevation: 4,
   
    width:'80%',
    alignSelf:'center'
  },
  circleStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    height: 34,
    width: 34,
    borderRadius: 17,
  },
  iconBtn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImg: {
    height: 20,
    width: 20,
  },
  iconImg18: {
    height: 16,
    width: 16,
    marginLeft:6,
    bottom:1,
    tintColor:Colors.white
  },
  btn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 5,
  },
  flatImgTop: {
    top: Screen.wp(-1.2),
    right: Screen.wp(-1),
  },
  flatImgBottom: {
    bottom: Screen.wp(-1),
    right: Screen.wp(-1),
  },

  title: {
    fontFamily: Fonts.SemiBold,
    color: Colors.black,
    fontSize: Dimens.F18,
  },
  radioForm: {
    width: Screen.wp('90%'),
    alignSelf: 'center',
    paddingHorizontal: Screen.wp(4),
  },
  draggableIcon: {
    width: 60,
    height: 5,
    borderRadius: 5,
    margin: 10,
    alignSelf: 'center',
    backgroundColor: '#ccc',
  },
  contentModalStyle: {
    width: '100%',
    height: Screen.hp('22%'),
    backgroundColor: 'white',
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lazyRoot:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  }
});
export default commonStyle;
