import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useRoute, useNavigation } from '@react-navigation/native';

const CarDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { car, userEmail } = route.params || {};
  
  // Sécurité en cas de données manquantes
  const carImage = car?.image || require("../../assets/image4.png");
  const carName = car?.name || "No name";
  const carSeats = car?.seats || "-";
  const carDriver = car?.includeDriver ? "Include Driver" : "Non-Driver";
  const carPrice = car?.price || "-";

  return (
    <View style={styles.container}>
      {/* Header Progress */}
      <View style={styles.progressBar} />

      {/* Title */}
      <Text style={styles.title}>Self Driver</Text>
      <Text style={styles.subtitle}>
        Prices may change depending on the length of the rental and the price of your rental car.
      </Text>

      {/* Car Image */}
      <View style={styles.carImageContainer}>
        <Image source={carImage} style={styles.carImage} />
      </View>

      {/* Car Name & Rating */}
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{carName}</Text>
        <View style={styles.rating}>
          <FontAwesome5 name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}> 4.8 (100+ reviews)</Text>
        </View>
      </View>
        <View style={styles.rating}>
          <MaterialIcons name="price-check" size={24} color="#FFD700" />
          <Text style={styles.ratingText}> {carPrice}</Text>
        </View>

      {/* Car Features */}
      <Text style={styles.sectionTitle}>Cars Info</Text>
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <FontAwesome5 name="users" size={16} color="#357AE8" />
          <Text style={styles.featureText}> {carSeats}</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="person" size={16} color="#357AE8" />
          <Text style={styles.featureText}> {carDriver}</Text>
        </View>
        <View style={styles.featureItem}>
          <Feather name="wind" size={16} color="#357AE8" />
          <Text style={styles.featureText}> Air Conditioning</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="settings" size={16} color="#357AE8" />
          <Text style={styles.featureText}> Matic</Text>
        </View>
        <View style={styles.featureItem}>
          <FontAwesome5 name="gas-pump" size={16} color="#357AE8" />
          <Text style={styles.featureText}> Fuel: Full to Full</Text>
        </View>
      </View>

      {/* Car Specs */}
      <Text style={styles.sectionTitle}>Cars Specs</Text>
      <View style={styles.specsContainer}>
        <View style={styles.specItem}>
          <Text style={styles.specTitle}>Max. Power</Text>
          <Text style={styles.specValue}>300</Text>
          <Text style={styles.specUnit}>hp</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specTitle}>0-60 mph</Text>
          <Text style={styles.specValue}>5.6</Text>
          <Text style={styles.specUnit}>sec</Text>
        </View>
        <View style={styles.specItem}>
          <Text style={styles.specTitle}>Top Speed</Text>
          <Text style={styles.specValue}>200</Text>
          <Text style={styles.specUnit}>mph</Text>
        </View>
      </View>

      {/* Booking Button */}
      <TouchableOpacity
        style={styles.bookingButton}
        onPress={() => {
          console.log("Booking by:", userEmail);
          // navigation logic here if needed
        }}
      >
        <Text style={styles.bookingText}>Booking now</Text>
      </TouchableOpacity>
          <Text style={styles.headerbottom}>
      
          </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20,marginBottom:20 },
  progressBar: {
    height: 6,
    width: "30%",
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 14, color: "#888", marginBottom: 15 },
  carImageContainer: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 10,
  },
  carImage: { width: "90%", height: 150, resizeMode: "contain" },
  carInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  carName: { fontSize: 20, fontWeight: "bold" },
  rating: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 14, marginLeft: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  featuresContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  featureItem: { flexDirection: "row", alignItems: "center", width: "50%", marginBottom: 10 },
  featureText: { fontSize: 14, marginLeft: 8 },
  specsContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  specItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    width: "30%",
    alignItems: "center",
  },
  specTitle: { fontSize: 12, color: "#888" },
  specValue: { fontSize: 20, fontWeight: "bold" },
  specUnit: { fontSize: 12, color: "#888" },
  bookingButton: {
    backgroundColor: "#357AE8",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  bookingText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  headerbottom: {
    width: 80,
    height: 150,
    margin: 5,
  },
});

export default CarDetailScreen;
