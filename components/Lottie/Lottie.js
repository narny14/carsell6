import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const MyLottieAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lottielab.json')}
        autoPlay
        loop
        resizeMode="cover" // important pour remplir sans espaces
        style={styles.animation}
        onError={(error) => console.log("Erreur Lottie:", error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animation: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '110%',
    height: '110%',
  },
});

export default MyLottieAnimation;
