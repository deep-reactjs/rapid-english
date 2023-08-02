import { CommonActions } from "@react-navigation/native";
const navigateAndReset =(routeName)=>{
    CommonActions.reset({
      index: 0,
      routes: [{name:routeName }],
    })
}
const Login = CommonActions.reset({
  index: 0,
  routes: [{ name: "Signin" }],
})
const Home = CommonActions.reset({
  index: 0,
  routes: [{ name: "Home" }],
})
export  {
  navigateAndReset,Login,Home
};