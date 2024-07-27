import {ImageView} from '../../config/appConstants';
const MenuList = [
  {
    id: '1',
    name: 'Home',
    icon: ImageView.home,
    navigation: 'Home',
    v: true,
  },
  {
    id: '2',
    name: 'Translator',
    icon: ImageView.language,
    navigation: 'Translator',
    v: true,
  },
  {
    id: '3',
    name: 'Quiz',
    icon: ImageView.quiz,
    navigation: 'Quiz',
    v: true,
  },
  {
    id: '4',
    name: 'Blog',
    icon: ImageView.blog,
    navigation: 'Blog',
    v: true,
  },
  {
    id: '5',
    name: 'Contact Us',
    icon: ImageView.contact,
    navigation: 'ContactUs',
    v: true,
  },
  {
    id: '6',
    name: 'About Us',
    icon: ImageView.ab,
    navigation: 'About',
    v: true,
  },
  {
    id: '7',
    name: 'Privacy policy',
    icon: ImageView.pp,
    navigation: 'Policy',
    v: true,
  },
  {
    id: '8',
    name: 'Forgot Password',
    icon: ImageView.password,
    navigation: 'ForgotPassword',
    v: true,
  },
  {
    id: '9',
    name: 'Delete Account',
    icon: ImageView.delete,
    navigation: 'Delete',
    v: false,
  },
  {
    id: '10',
    name: 'Logout',
    icon: ImageView.logout,
    navigation: 'Signin',
    v: false,
  },
];
export {MenuList};
