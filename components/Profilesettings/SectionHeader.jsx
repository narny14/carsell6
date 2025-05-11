import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

function SectionHeader({ title, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 16,
    paddingBottom: 6,
  },
  text: {
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 12,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "600",
    paddingTop: 10,
  },
});

export default SectionHeader;
