// BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";

import CarRentalScreen from "../CarRentalScreen/CarRentalScreen";
import DummyScreen from "../DummyScreen/DummyScreen";
import HomeStackNavigator from "../HomeStackNavigator/HomeStackNavigator";
import Profilesettings from "../Profilesettings/Setting";
import Notification from "../Notification/Notification";
import Reservation from "../Reservation/Reservation";
import FormulaireAnnonce from "../FormulaireAnnonce/FormulaireAnnonce";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ route }) => {
    const userEmail = route?.params?.userEmail;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Reservation") iconName = "time-outline";
          else if (route.name === "Publier") iconName = "radio-outline";
          else if (route.name === "Notifications") iconName = "notifications-outline";
          else if (route.name === "Compte") iconName = "person-outline";
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#357AE8",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 5 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {props => <HomeStackNavigator {...props} userEmail={userEmail} />}
      </Tab.Screen>
      <Tab.Screen name="Reservation" component={Reservation} />
      <Tab.Screen name="Publier" component={FormulaireAnnonce} />
      <Tab.Screen name="Notifications" component={Notification} />
      <Tab.Screen name="Compte" component={Profilesettings} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
