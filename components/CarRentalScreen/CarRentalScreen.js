import React , { useState, useEffect } from "react";
import {View,Text,TextInput,Image,TouchableOpacity,StyleSheet,ScrollView,Dimensions,} from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons, Feather } from "@expo/vector-icons";

const screenWidth = Dimensions.get('window').width;

const CarRentalScreen = ({ userEmail, navigation }) => {
  const route = useRoute();
  const { query } = route.params || {}; // d'abord récupérer query
const [searchQuery, setSearchQuery] = useState(query || '');
const [cars, setCars] = useState([]);
const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('https://carsell-backend.onrender.com/annoncesdujour', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'cookie_name=cookie_value' // Ajoute ici les cookies si nécessaires
      }
    })
    .then(response => response.text()) // Récupère la réponse en texte brut d'abord
    .then(text => {
      console.log("Réponse brute:", text);
      try {
        const data = JSON.parse(text);  // Tente de parser si c'est du JSON
        if (data && Array.isArray(data)) {
          setCars(data);
        } else {
          console.error('Format inattendu', data);
        }
      } catch (error) {
        console.error('Erreur de parsing:', error);
      }
    })
    .catch(error => console.error('Erreur de chargement:', error));
  }, []);




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
{cars.map((item) => {
  
          const firstPhoto = item.photos && item.photos.length > 0 ? item.photos[0] : null;
          const imageUrl = firstPhoto
            ? (firstPhoto.startsWith('http') ? firstPhoto : `http://spencer.infinityfreeapp.com/uploads/${firstPhoto}`)
            : 'https://via.placeholder.com/150'; // Default image if no photo is available

  return (
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
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.carImage} />
      )}
      <Text style={styles.carName}>{item.marque} {item.modele}</Text>
      <Text style={styles.carDetails}>
        {item.seats ? item.seats : "0"} • {item.transmission}
      </Text>
      <Text style={styles.carPrice}>
        <MaterialIcons name="price-check" size={16} color="#FFD700" /> {item.prix} €
      </Text>
    </TouchableOpacity>
  );
})}


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
