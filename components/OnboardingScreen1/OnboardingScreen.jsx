import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Bouton Skip */}
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate("Onboarding2")}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Image et fond stylisé */}
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/image1.png")} style={styles.image} resizeMode="contain" />
      </View>

      {/* Texte */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          We Prioritize Your <Text style={styles.highlight}>Safety</Text> and Enjoyment of Your Trip
        </Text>
        <Text style={styles.subtitle}>
          Each of our cars has undergone detailed inspection and maintenance to ensure the enjoyment and safety of your trip.
        </Text>
      </View>

      {/* Indicateurs de pagination */}
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Bouton Next */}
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("Onboarding2")}>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  skipText: {
    fontSize: 16,
    color: "white",
  },
  imageContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "90%",
    height: "70%",
  },
  textContainer: {
    flex: 2,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E293B",
  },
  highlight: {
    color: "#3B82F6",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#3B82F6",
  },
  nextButton: {
    backgroundColor: "#3B82F6",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
});

export default OnboardingScreen;
