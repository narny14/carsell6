import * as React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

function Header({ title }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/c0d781f1c7bc49b69c6ea3c8500ea647/e2b91429fb3271458f25643d60fb72a6bae53c6ba727191b102689642c855d7b?placeholderIfAbsent=true",
          }}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <TouchableOpacity>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/c0d781f1c7bc49b69c6ea3c8500ea647/239c775d9318e4cf20545e5f9584c58dbc78a469b263eb795cdc3a753cfc7577?placeholderIfAbsent=true",
          }}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 14,
    marginLeft: 11,
    marginBottom: -22,
    gap: "40px 100px",
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    aspectRatio: 0.87,
    objectFit: "contain",
    objectPosition: "center",
    width: 26,
    flexShrink: 0,
  },
  titleContainer: {
    alignSelf: "stretch",
    flex: 1,
  },
  titleText: {
    fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
    fontSize: 15,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "600",
  },
  menuIcon: {
    aspectRatio: 1,
    objectFit: "contain",
    objectPosition: "center",
    width: 21,
    flexShrink: 0,
  },
});

export default Header;
