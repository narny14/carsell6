import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";

const CustomSplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000); // Cache l'écran après 2 secondes
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/artboard.png")} style={styles.logo} />
      <Text style={styles.text}>GeRental</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B82F6",
  },
});

export default CustomSplashScreen;
