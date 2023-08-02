import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { TabBar } from "./TabBar";
import {
  Home,
  MyCourse,
  Account,
  Discussion,
  Search
} from "../Route";
import { useSafeArea } from "react-native-safe-area-context";
import { View } from "react-native";

export default BottomMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1, position: "relative"}}>
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="menu-book" component={MyCourse} />
        <Tab.Screen name="search" component={Search} />
        <Tab.Screen name="messenger-outline" component={Discussion} />
        <Tab.Screen name="person-outline" component={Account} />
      </Tab.Navigator>
      {useSafeArea().bottom > 0 && (
        <View
          style={{
            height: useSafeArea().bottom - 5,
            backgroundColor: "white",
          }}
        />
      )}
    </View>
  );
};
