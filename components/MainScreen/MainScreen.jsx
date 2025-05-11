import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur GeRental 🚗</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});

export default MainScreen;
