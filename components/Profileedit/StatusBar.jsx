import * as React from "react";
import { View, Image, StyleSheet } from "react-native";

function StatusBar() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/c0d781f1c7bc49b69c6ea3c8500ea647/0444fa6a134c58c8c06252274ae3cab0c1a5e4c2f14c304a12694a3a0ff80a18?placeholderIfAbsent=true",
        }}
        style={styles.timeImage}
      />
      <View style={styles.iconsContainer}>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/c0d781f1c7bc49b69c6ea3c8500ea647/7d1ca8a2b2634c2a173238ad8e27bc4db3582add1fd8befe194d7d911d36e003?placeholderIfAbsent=true",
          }}
          style={styles.signalIcon}
        />
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/c0d781f1c7bc49b69c6ea3c8500ea647/17cec0df4987b467329a5988cae474db7753a98c3405ce0f97dc87c4296b74ff?placeholderIfAbsent=true",
          }}
          style={styles.wifiIcon}
        />
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/c0d781f1c7bc49b69c6ea3c8500ea647/26f1537e26e6626bb88eb20a3763c11a443684debc611ebf2ea6193c8f364bd3?placeholderIfAbsent=true",
          }}
          style={styles.batteryIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    alignItems: "stretch",
    gap: "40px 100px",
    overflow: "hidden",
  },
  timeImage: {
    aspectRatio: 2.57,
    objectFit: "contain",
    objectPosition: "center",
    width: 54,
    borderRadius: 20,
    flexShrink: 0,
  },
  iconsContainer: {
    display: "flex",
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  signalIcon: {
    aspectRatio: 1.43,
    objectFit: "contain",
    objectPosition: "center",
    width: 20,
    alignSelf: "stretch",
    marginTop: "auto",
    marginBottom: "auto",
    flexShrink: 0,
  },
  wifiIcon: {
    aspectRatio: 1.14,
    objectFit: "contain",
    objectPosition: "center",
    width: 16,
    alignSelf: "stretch",
    marginTop: "auto",
    marginBottom: "auto",
    flexShrink: 0,
  },
  batteryIcon: {
    aspectRatio: 1.79,
    objectFit: "contain",
    objectPosition: "center",
    width: 25,
    alignSelf: "stretch",
    marginTop: "auto",
    marginBottom: "auto",
    flexShrink: 0,
  },
});

export default StatusBar;
