import * as React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function ContentPreferences() {
  return (
    <View style={styles.container}>
      <View style={styles.lineRow}>
        <View  style={styles.pre1}>
        <Image
          source={require('../../assets/heart.png')}
          style={styles.favoriteIcon}
        />
        <View>
          <Text style={styles.preferenceText}>Favourite</Text>
        </View>
          
        </View>

      </View>
      <View style={styles.lineRow}>
        <View style={styles.pre1}> 
        <Image
          source={require('../../assets/download.png')}
          style={styles.downloadIcon}
        />
        <View>
          <Text style={styles.preferenceText}>Services de l'hôtel </Text>
        </View>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 9,
    marginLeft: 25,
    width: 112,
    maxWidth: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 15,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "500",
  },
  favoriteRow: {
    display: "flex",
    alignItems: "stretch",
    gap: 15,
    flexDirection:'row',
  },
  favoriteIcon: {
    aspectRatio: 1,
    objectFit: "contain",
    objectPosition: "center",
    width: 19,
    flexShrink: 0,
  },
  downloadRow: {
    display: "flex",
    marginTop: 9,
    alignItems: "stretch",
    gap: 11,
    flexDirection:'row',
  },
  downloadIcon: {
    aspectRatio: 1,
    objectFit: "contain",
    objectPosition: "center",
    width: 24,
    flexShrink: 0,
  },
  preferenceText: {
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
  arrow:{
    aspectRatio: 1,
    width: 14,
    flexShrink: 0,
    alignSelf: "flex-start", // Assure l'alignement à gauche
    marginLeft: 0, // S'assurer qu'il est bien collé à gauche
  },
});

export default ContentPreferences;
