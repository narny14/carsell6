import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./components/OnboardingScreen1/OnboardingScreen";
import OnboardingScreen2 from "./components/OnboardingScreen2/OnboardingScreen";
import OnboardingScreen3 from "./components/OnboardingScreen3/OnboardingScreen";
import SignInScreen from "./components/SignInScreen/SignInScreen";
import SignUpScreen from "./components/SignUpScreen/SignUpScreen";
import CarRentalScreen from "./components/CarRentalScreen/CarRentalScreen";
import CarDetailScreen from "./components/CarDetailScreen/CarDetailScreen";
import Lottie from "./components/Lottie/Lottie";
import ProfileEdit from "./components/Profileedit/ProfileEdit";
import Profilesettings from "./components/Profilesettings/Setting";
import Notification from "./components/Notification/Notification";
import Searchresults from "./components/Searchresults/Searchresults";
import Reservation from "./components/Reservation/Reservation";
import FormulaireAnnonce from "./components/FormulaireAnnonce/FormulaireAnnonce";
import BottomTabNavigator from "./components/BottomTabNavigator/BottomTabNavigator"; // adapte le chemin selon ton projet


const Stack = createStackNavigator();

const CustomSplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Passe à l'écran suivant après 3 secondes
    }, 3000);
    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("./assets/artboard.png")} style={styles.logo} />
      <Text style={styles.text}>GeRental</Text>
    </View>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <CustomSplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Onboarding1" component={OnboardingScreen} />
        Ajoute les autres écrans ici */}
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="MainTabs">
          {props => <BottomTabNavigator {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CarRentalScreen" component={CarRentalScreen} />
        <Stack.Screen name="CarDetailScreen" component={CarDetailScreen} />
        <Stack.Screen name="Lottie" component={Lottie} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="Profilesettings" component={Profilesettings} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Searchresults" component={Searchresults} />
        <Stack.Screen name="Reservation" component={Reservation} />
        <Stack.Screen name="FormulaireAnnonce" component={FormulaireAnnonce} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Écran d'accueil temporaire
const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Welcome to Home Screen!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B82F6",
  },
});

export default App;
