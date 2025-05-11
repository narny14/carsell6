import * as React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

function ProfileSection({user}) {
  return (
    
      <View style={styles.profileHeader}>
        <View style={styles.profiletop}>
    
        <Image
          source={require('../../assets/arrow-left.png')}
          style={styles.backIcon}
        />
        <View>
          <Text style={styles.profileText}>user</Text>
        </View>
        <Image
          source={require('../../assets/bell.png')}
          style={styles.menuIcon}
        />

        </View>
       <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/c0d781f1c7bc49b69c6ea3c8500ea647/5bb97c70a624285f25f10e7a9c667155ad7617444eebe96ee1d1ca44b963e513?placeholderIfAbsent=true",
        }}
        style={styles.profileImage}
       />
      </View>
    
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    display: "flex",
    marginTop: 17,
    marginLeft: 11,
    alignItems: "stretch",
    gap: "40px 100px",
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 15,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "600",
    backgroundColor:'#FF8D76',
    justifyContent: 'space-between', // Espacement équitable entre les éléments
    alignItems:'flex-start',
    height:150,
    paddingHorizontal: 10, // Ajoute un peu de marge intérieure
  },
  profiletop:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Assure un espacement équitable
    width: '100%', // Assure que le conteneur prend toute la largeur disponible
    paddingHorizontal: 15, // Ajoute un peu d'espace sur les côtés
    paddingTop:10,
    marginBottom:5,

  },
  backIcon: {
    aspectRatio: 0.87,
    objectFit: "contain",
    objectPosition: "center",
    width: 26,
    flexShrink: 0,
    gap:15,
  },
  profileText: {
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 15,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "600",
    gap:15,
    maxWidth:200,
    maxHeight:40,
    
  },
  menuIcon: {
    aspectRatio: 1,
    objectFit: "contain",
    objectPosition: "center",
    width: 19,
    marginTop: "auto",
    marginBottom: "auto",
    flexShrink: 0,
    gap:15,
  },
  profileImage: {
    aspectRatio: 1,
    objectFit: "contain",
    objectPosition: "center",
    width: 122,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    alignSelf: "center",
    zIndex: 10,
    marginTop: 19,
    marginBottom: 26,
    maxWidth: "100%",
  },
});

export default ProfileSection;
