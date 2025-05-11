import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

function TabSelector() {
  return (
    <View style={styles.container}>
      <View style={styles.treadingTab}>
        <Text style={styles.tabText}>Notifications & Messages</Text>
      </View>
      <View style={styles.todayTab}>
        <Text style={styles.tabText}>Offres & Promotions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 7,
    marginLeft: 26,
    flexDirection: "column",
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 15,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "500",
  },
  tabText: {
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 15,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "500",
  },
  treadingTab: {
    alignSelf: "stretch",
    marginTop: 9,
  },
  todayTab: {
    marginTop: 7,
  },
});

export default TabSelector;
