import {Dimensions, Platform} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  listenOrientationChange,
  removeOrientationListener,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Constants = {
  API_BASE_URL: 'https://rapid-english.com/api/',
  API_BASE_URL_LOCAL: 'https://beeinnow.in/rapid-english/api/',
  GOOGLE_T_API_KEY: 'AIzaSyDYyMlsD5ZLNfmzLB-5yvEzuKhQcIr1nJ4',
  GOOGLE_SIGNIN_KEY_ANDROID:
    '310538639449-0j36mlu6iu2j7ngpr320lub25erergdh.apps.googleusercontent.com',

  GOOGLE_SIGNIN_KEY_IOS:
    '310538639449-0j36mlu6iu2j7ngpr320lub25erergdh.apps.googleusercontent.com',
  SENTRY_INTERNAL_DSN: '',
  REQUEST_TIMEOUT: 20000 * 1,
  dateFormat: 'DD-MM-YYYY',
  timeFormat: 'DD/MM/YYYY h:mm:ss a',
  dateFormatApi: 'YYYY/MM/DD',
  config: {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  },
  // BANNER_KEY:
  //   Platform.OS == 'android'
  //     ? 'ca-app-pub-9542796943771971/4018042184'
  //     : 'ca-app-pub-9542796943771971/4354636226',
  // REWARDED:
  //   Platform.OS == 'android'
  //     ? 'ca-app-pub-9542796943771971/5327927186'
  //     : 'ca-app-pub-9542796943771971/4660561397',
  // REWARDED_INTERSTITIAL:
  //   Platform.OS === 'android'
  //     ? 'ca-app-pub-9542796943771971/5327927186'
  //     : 'ca-app-pub-9542796943771971/4660561397',
  // INTERSTITIAL__KEY:
  //   Platform.OS == 'android'
  //     ? 'ca-app-pub-9542796943771971/6006783416'
  //     : 'ca-app-pub-9542796943771971/4602596976',

  BANNER_KEY:
    'ca-app-pub-3940256099942544/9214589741' || Platform.OS == 'android'
      ? 'ca-app-pub-9542796943771971/4018042184'
      : 'ca-app-pub-9542796943771971/4354636226',
  REWARDED:
    'ca-app-pub-3940256099942544/5224354917' || Platform.OS == 'android'
      ? 'ca-app-pub-9542796943771971/5327927186'
      : 'ca-app-pub-9542796943771971/4660561397',
  REWARDED_INTERSTITIAL:
    Platform.OS === 'android'
      ? 'ca-app-pub-9542796943771971/5327927186'
      : 'ca-app-pub-9542796943771971/4660561397',
  INTERSTITIAL__KEY:
    'ca-app-pub-3940256099942544/1033173712' || Platform.OS == 'android'
      ? 'ca-app-pub-9542796943771971/6006783416'
      : 'ca-app-pub-9542796943771971/4602596976',
};

const Colors = {
  primary: '#5567ff',
  acent: '#272c33',
  secondary: '#303956',
  shadow: 'rgba(252, 248, 227, 0.6)',
  disable: '#81818b',
  green: '#39b18d',
  pink: '#ff4081',
  white: '#fff',
  black: '#000',
  red: '#dc3545',
  yellow: '#fcc92f',
  viewBox: '#f8f8f8',
  medium_gray: 'rgba(125, 125, 130, 0.5)',
  dark_gray: '#7C7C80',
  cool_gray: 'rgba(125, 125, 130, 0.7)',
  light_gray: 'rgba(125, 125, 130, 0.1)',
  light: 'rgb(240, 240, 240)',
  iconColor: '#0C0F23',
  link: '#0B0080',
};

const Dimens = {
  F12: RFPercentage(1.4),
  F14: RFPercentage(1.7),
  F16: RFPercentage(1.9),
  F18: RFPercentage(2.2),
  F20: RFPercentage(2.4),
  F22: RFPercentage(2.6),
  F24: RFPercentage(2.9),
  F26: RFPercentage(3.1),
  F28: RFPercentage(3.4),
  F30: RFPercentage(3.6),
  F40: RFPercentage(4),
};

const Screen = {
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
  wp: widthPercentageToDP,
  hp: heightPercentageToDP,
  scale: Dimensions.get('window').scale,
  fontScale: Dimensions.get('window').fontScale,
  OrientationChange: listenOrientationChange,
  OrientationListener: removeOrientationListener,
};

const Fonts = {
  Bold: 'Poppins-Bold',
  SemiBold: 'Poppins-SemiBold',
  Medium: 'Poppins-Medium',
  Regular: 'Poppins-Regular',
  Light: 'Poppins-Light',
};

const ImageView = {
  logo: require('../assets/as.png'),
  tr: require('../assets/tr.png'),
  language: require('../assets/language.png'),
  quiz: require('../assets/quiz.png'),
  delete: require('../assets/delete.png'),
  blog: require('../assets/blog.png'),
  ab: require('../assets/ab.png'),
  pp: require('../assets/pp.png'),
  edit: require('../assets/edit1.png'),
  quote: require('../assets/left-quote.png'),
  menu: require('../assets/drawer.png'),
  user: require('../assets/profile.png'),
  email: require('../assets/email.png'),
  bottom: require('../assets/bottom.png'),
  notification: require('../assets/notification.png'),
  bg: require('../assets/bg.png'),
  fb: require('../assets/fb.png'),
  google: require('../assets/google.png'),
  erro: require('../assets/erro.png'),
  phone: require('../assets/phone.png'),
  chat: require('../assets/chat.png'),
  faq: require('../assets/faq.png'),
  logout: require('../assets/log-out.png'),
  down_arrow: require('../assets/down-arrow.png'),
  camera: require('../assets/camera.png'),
  gallery: require('../assets/gallery.png'),
  arrowRight: require('../assets/arrow-right.png'),
  back: require('../assets/left-arrow.png'),
  doubleRightArrowsAngles: require('../assets/double-right-arrows-angles.png'),
  home: require('../assets/home2.png'),
  account: require('../assets/account.png'),
  repeat: require('../assets/repeat.png'),
  maintenance: require('../assets/maintenance.png'),
  update: require('../assets/update.png'),
  volume: require('../assets/volume.png'),
  wp: require('../assets/wp.png'),
  contact: require('../assets/contact-info.png'),
  noImage: require('../assets/noProfile.png'),
  close: require('../assets/close.png'),
  trophy: require('../assets/trophy.png'),
  instagram: require('../assets/instagram.png'),
  telegram: require('../assets/telegram.png'),
  twitter: require('../assets/twitter.png'),
  youtube: require('../assets/youtube.png'),
  gmail: require('../assets/gmail.png'),
  password: require('../assets/password.png'),
  download: require('../assets/download.png'),
};
const Strings = {
  App_Title: 'Rapid',
  loading: 'Loading...',
  fmsg: 'We will send you a new password to your registered email.',
  accunt: "Don't have an account?",
  noaccunt: 'Already have account?',
  Phone: 'Mobile',
  login: 'Login',
  logout: 'Logout',
  settings: 'Settings',
  wrongPhone: 'Wrong Phone!',
  wrongEmail: 'Wrong Email!',
  eEmail: 'Please Enter Email',
  eEmail2: 'Please Enter Valid Email',
  fpwd: 'Forgot Password?',
  ok: 'Okay',
  submit: 'Submit',
  confirmCode: 'Confirm Code',
  waitForOtpTiming: 'You can Re-login after ',
  Signup: 'Sign Up',
  Signin: 'Sign In',
  fName: 'First Name',
  lName: 'Last Name',
  name: 'Name',
  email: 'Email',
  password: 'Password',
  passwordM: 'Password do not match',
  alreadyLogin: 'I have an account already',
  title: 'Title',
  add: 'Add',
  address: 'Address',
  submit: 'Submit',
  cancel: 'Cancel',
  close: 'Close',
  go: 'Go',
  dic: 'Dictionary',
  dicP: 'Search for a word',
  definition: 'Definition',
  ex: 'Example',
  callus: 'Call us',
  emailus: 'Email us',
  chatus: 'Chat with us',
  noq: 'No Quiz Available',
  nono: 'No Notification Available',
  quizC: 'Quiz Complete',
  inst: 'Instagram',
  tw: 'Twitter',
  yt: 'YouTube',
  tele: 'Telegram',
  otpMessage:
    "We have sent the code to the registered Email. If you don't receive an OTP from us within this time frame, please make sure that you check your spam folder.",
  codeExp: 'Code expire in',
  verify: 'Verify OTP',
  wrongOtp: 'Wrong OTP. Please Retry!',
  coder: "Didn't receive code?",
  resend: 'Resend Code',
  opassword: 'Old Password',
  npassword: 'New Password',
  cpassword: 'Confirm Password',
  opassword1: 'Enter old password',
  npassword1: 'Enter new password',
  cpassword1: 'Enter confirm password',
  newpcf: 'New Password must contain the following:',
  ll: 'Lowercase letter',
  cl: 'Capital (uppercase) letter',
  num: 'Number',
  mc: ' Minimum 8 characters',
  correct: 'correct.wav',
  score: 'score.wav',
  score2: 'score2.mp3',
  wrong: 'wrong.wav',
  synonyms: 'Synonyms',
  antonyms: 'Antonyms',
};

const Storage_Key = {
  id: '@id',
  email: '@email',
  name: '@name',
  phone: '@phone',
  profile: '@profile',
  logo: '@logo',
  app: '@app',
  app1: '@app1',
};
export {
  Colors,
  Constants,
  Dimens,
  Fonts,
  ImageView,
  Screen,
  Storage_Key,
  Strings,
};
