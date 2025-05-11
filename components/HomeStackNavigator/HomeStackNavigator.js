import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarRentalScreen from "../CarRentalScreen/CarRentalScreen";
import CarDetailScreen from "../CarDetailScreen/CarDetailScreen";
import ProfileEdit from "../Profileedit/ProfileEdit";
import Profilesettings from "../Profilesettings/Setting";
import Searchresults from "../Searchresults/Searchresults";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = ({ route }) => {
  const userEmail = route?.params?.userEmail;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CarRental">
        {props => <CarRentalScreen {...props} userEmail={userEmail} />}
      </Stack.Screen>
      <Stack.Screen name="CarDetail" component={CarDetailScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="Profilesettings" component={Profilesettings} />
      <Stack.Screen name="Searchresults" component={Searchresults} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
