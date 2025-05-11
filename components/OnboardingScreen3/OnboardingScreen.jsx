import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Start Your Fun Adventure\nwith GeRental",
    description:
      "The best selection of cars to suit your needs. From family cars to sporty ones, we have everything you're looking for.",
    image: require("../../assets/image4.png"),
  },
  {
    id: "2",
    title: "Drive with Comfort & Safety",
    description:
      "All our cars are maintained regularly to ensure your safety and provide you with a smooth driving experience.",
    image: require("../../assets/image1.png"),
  },
  {
    id: "3",
    title: "Easy Booking, Great Prices",
    description:
      "Rent a car quickly and at an affordable price, without any hassle. Choose from a wide range of vehicles today!",
    image: require("../../assets/image5.png"),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("Home");
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Bouton Skip */}
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Forme arrondie en haut */}
      <View style={styles.curvedBackground} />

      {/* Image */}
      <Image source={slides[currentIndex].image} style={styles.image} resizeMode="contain" />

      {/* Texte */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{slides[currentIndex].title}</Text>
        <Text style={styles.description}>{slides[currentIndex].description}</Text>
      </View>

      {/* Pagination */}
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentIndex && styles.activeDot]} />
        ))}
      </View>

      {/* Navigation */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && { opacity: 0.5 }]}
          onPress={prevSlide}
          disabled={currentIndex === 0}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={nextSlide}>
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    color: "white",
  },
  curvedBackground: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: height * 0.45,
    backgroundColor: "#3B82F6",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  image: {
    width: "90%",
    height: height * 0.3,
    marginTop: height * 0.1,
  },
  textContainer: {
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
  description: {
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
  navButtons: {
    flexDirection: "row",
    position: "absolute",
    bottom: 40,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: "#3B82F6",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OnboardingScreen;
