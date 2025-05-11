import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

function UpdateButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Update</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 65,
    width: "100%",
    maxWidth: 283,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 9,
    paddingBottom: 9,
    backgroundColor: "#007AFF", // Added background color for the button
  },
  buttonText: {
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 15,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "700",
    textAlign: "center",
  },
});

export default UpdateButton;
