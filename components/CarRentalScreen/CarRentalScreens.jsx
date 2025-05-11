import React , { useState, useEffect } from "react";
import {View,Text,TextInput,Image,TouchableOpacity,StyleSheet,ScrollView,Dimensions,} from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons, Feather } from "@expo/vector-icons";

const screenWidth = Dimensions.get('window').width;

const cars = [
  {
    id: "1",
    name: "Toyota New Avanza",
    seats: "7 Seat",
    includeDriver: true,
    price: "3,900",
    image: require("../../assets/3aab794d83443f0541456e84c1e6528d-removebg-preview.png"),
  },
  {
    id: "2",
    name: "Toyota Alphard",
    seats: "8 Seat",
    includeDriver: false,
    price: "3,900",
    image: require("../../assets/2b781eca8cfc0b00edcfc9c50067f33a-removebg-preview.png"),
  },
  {
    id: "3",
    name: "Honda Mobilio",
    seats: "7 Seat",
    includeDriver: true,
    price: "3,500",
    image: require("../../assets/DeWatermark.ai_1745458103786-removebg-preview.png"),
  },
  {
    id: "4",
    name: "Suzuki Ertiga",
    seats: "7 Seat",
    includeDriver: false,
    price: "3,400",
    image: require("../../assets/21dc514ae50fd7cf46aa2b42bc89a66d-removebg-preview.png"),
  },
  {
    id: "5",
    name: "Toyota New Avanza",
    seats: "7 Seat",
    includeDriver: true,
    price: "3,900",
    image: require("../../assets/3aab794d83443f0541456e84c1e6528d-removebg-preview.png"),
  },
  {
    id: "6",
    name: "Toyota Alphard",
    seats: "8 Seat",
    includeDriver: false,
    price: "3,900",
    image: require("../../assets/2b781eca8cfc0b00edcfc9c50067f33a-removebg-preview.png"),
  },
  {
    id: "7",
    name: "Honda Mobilio",
    seats: "7 Seat",
    includeDriver: true,
    price: "3,500",
    image: require("../../assets/DeWatermark.ai_1745458103786-removebg-preview.png"),
  },
  {
    id: "8",
    name: "Suzuki Ertiga",
    seats: "7 Seat",
    includeDriver: false,
    price: "3,400",
    image: require("../../assets/21dc514ae50fd7cf46aa2b42bc89a66d-removebg-preview.png"),
  },
  {
    id: "9",
    name: "Mercedes-AMG",
    seats: "4 Seat",
    includeDriver: false,
    price: "8,400",
    image: require("../../assets/pexels-mikebirdy-112460-removebg-preview.png"),
  },
];

const CarRentalScreen = ({ userEmail, navigation }) => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = React.useState(query || '');
  const { query } = route.params || {};

  
  useEffect(() => {
    console.log("Mot de recherche :", query);
  }, [query]);
  


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text
            style={styles.greeting}
            onPress={() => {
              navigation.navigate("Lottie");
            }}
          >
            Hello, {userEmail ? userEmail : "Guest"}!
          </Text>
          <Text style={styles.subtitle}>What are you looking for?</Text>
        </View>
        <Feather name="bell" size={24} color="white" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
      <TouchableOpacity
        onPress={() => {
        if (searchQuery.trim().length > 0) {
          navigation.navigate("Searchresults", { searchQuery: searchQuery.trim() });
        }
        }}
      >
        <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
      </TouchableOpacity>
        <TextInput placeholder="Search nearby cars for rent" style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false} />
      </View>

      {/* Promo Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Special 40% Discount for New Users</Text>
        <Text style={styles.bannerText}>
          Get a chance to experience great value as a first-time user with our limited offer.
        </Text>
        <Image source={require("../../assets/DeWatermark.ai_1745458103786-removebg-preview.png")} style={styles.bannerImage} />
      </View>

      {/* Type of Car Rental */}
      {/* Type of Car Rental */}
<Text style={styles.sectionTitle}>Type of Car Rental</Text>
<View style={styles.rentalTypeContainer}>
  <TouchableOpacity style={styles.rentalType}>
    <MaterialIcons name="directions-car" size={24} color="#357AE8" />
    <Text style={styles.rentalTypeText}>Self Driver</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.rentalType}>
    <MaterialIcons name="person" size={24} color="#357AE8" />
    <Text style={styles.rentalTypeText}>With Driver</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.rentalType}>
    <MaterialIcons name="directions-car-filled" size={24} color="#357AE8" />
    <Text style={styles.rentalTypeText}>Sell</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.rentalType}>
    <MaterialIcons name="car-rental" size={24} color="#357AE8" />
    <Text style={styles.rentalTypeText}>Rent</Text>
  </TouchableOpacity>
</View>


      {/* Popular Cars (ScrollView vertical, 2 colonnes) */}
      {/* Popular Cars (ScrollView vertical, 2 colonnes) */}
<Text style={styles.sectionTitle}>Popular Cars</Text>
<ScrollView contentContainerStyle={styles.gridContainer}>
  {cars.map((item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.carCard}
      onPress={() => {
        navigation.navigate("CarDetail", {
          car: item,
          userEmail: userEmail,
        });
      }}
      
    >
      <Image source={item.image} style={styles.carImage} />
      <Text style={styles.carName}>{item.name}</Text>
      <Text style={styles.carDetails}>
        {item.seats} • {item.includeDriver ? "Include Driver" : "Non-Driver"}
      </Text>
      <Text style={styles.carice}><MaterialIcons name="price-check" size={24} color="#FFD700" />{item.price} / Day</Text>
    </TouchableOpacity>
  ))}
</ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20},
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: {
    fontSize: 12,
    padding: 10,
    width: '100%',
    margin: 0,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#357AE8",
  },
  subtitle: { fontSize: 14, color: "#888" },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1 },
  banner: {
    backgroundColor: "#357AE8",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    position: "relative",
  },
  bannerTitle: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  bannerText: { fontSize: 12, color: "#fff", marginTop: 5 },
  bannerImage: { position: "absolute", right: 10, top: 15, width: 80, height: 50 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  rentalTypeContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  rentalType: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  rentalTypeText: { marginTop: 5, fontSize: 12, fontWeight: "bold" },

  // Popular Cars Grid
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  carCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: (screenWidth - 60) / 2, // Two columns with spacing
    height: 150,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  carImage: { width: "100%", height: 60, resizeMode: "contain", borderRadius: 8 },
  carName: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
  carDetails: { fontSize: 12, color: "#888", marginTop: 3 },
  carPice: { fontSize: 14, fontWeight: "bold", color: "#357AE8", marginTop: 5 },
});

export default CarRentalScreen;
