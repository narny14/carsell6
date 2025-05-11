import * as React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
function AppPreferences() {
  return (
    <View style={styles.container}>
      <View style={styles.lineRow}>
      <View  style={styles.pre1}>
        <Image
          source={require('../../assets/translate.png')}
          style={styles.darkmodeIcon}
        />
        <View>
        <Text style={styles.preferenceText}>Réservations</Text>
        </View>
      </View>

      </View>
      <View style={styles.lineRow}>
        
      <View  style={styles.pre1}>
        <View>
          <Text style={styles.preferenceText}>Paiements & Factures</Text>
        </View>

      </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 18,
    marginLeft: 24,
    width: 209,
    maxWidth: "100%",
    flexDirection: "column",
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 15,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "500",
  },
  pre1:{
    flexDirection:'row',
  },
  lineRow: {
    display: "flex",
    marginTop: 9,
    alignItems: "stretch",
    gap: 11,
    flexDirection:'row',
    width:screenWidth-50,
    alignItems: "stretch",
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 15,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "600",
    justifyContent: 'space-between', // Espacement équitable entre les éléments
    alignItems:'flex-start',
    paddingHorizontal: 10, // Ajoute un peu de marge intérieure
  },
  darkmodeIcon: {
    aspectRatio: 1,
    objectFit: "contain",
    objectPosition: "center",
    width: 24,
    flexShrink: 0,
  },
  arrow:{
    aspectRatio: 1,
    width: 14,
    flexShrink: 0,
    alignSelf: "flex-start", // Assure l'alignement à gauche
    marginLeft: 0, // S'assurer qu'il est bien collé à gauche
  },
  wifiRow: {
    display: "flex",
    marginTop: 9,
    alignItems: "stretch",
    gap: 11,
    flexDirection:'row',
  },
  wifiIcon: {
    aspectRatio: 1,
    objectFit: "contain",
    objectPosition: "center",
    width: 24,
    flexShrink: 0,
  },
  wifiTextContainer: {
    display: "flex",
    marginTop: 9,
    alignItems: "stretch",
    gap: 11,
    flexDirection:'row',
  },
  preferenceText: {
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 15,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "500",
    width:'100%',
  },
});

export default AppPreferences;
