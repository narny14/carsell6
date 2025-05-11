import * as React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

function ProfilePicture() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/c0d781f1c7bc49b69c6ea3c8500ea647/05ea36dc121a4bb6130efd1d0e98b2bf142723d9b7adc54ab365640bf049d2c3?placeholderIfAbsent=true",
        }}
        style={styles.profileImage}
      />
      <TouchableOpacity style={styles.changeButton}>
        <Text style={styles.changeText}>Change Picture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    aspectRatio: 1,
    objectFit: "contain",
    objectPosition: "center",
    width: 142,
    borderRadius: 50,
    alignSelf: "center",
    maxWidth: "100%",
  },
  changeButton: {
    marginTop: 5,
  },
  changeText: {
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 12,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "400",
  },
});

export default ProfilePicture;
