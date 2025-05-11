import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { AntDesign, FontAwesome } from "@expo/vector-icons";

const SignInScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      {/* Retour */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      {/* Titre */}
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>
        Sign up now and enjoy rental ease like never before.
      </Text>

      {/* Champ Email */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="example@gmail.com" keyboardType="email-address" />
      </View>

      {/* Champ Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <FontAwesome name={passwordVisible ? "eye" : "eye-slash"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Mot de passe oublié */}
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotText}>Forget Password?</Text>
      </TouchableOpacity>

      {/* Bouton Sign In */}
      <TouchableOpacity style={styles.signInButton}   onPress={() => {
       navigation.navigate("CarRentalScreen");
       console.log("CarRentalScreen");
      }}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Connexion via réseaux sociaux */}
      <Text style={styles.orText}>Or sign in with</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#1877F2" }]}>
          <AntDesign name="facebook-square" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#DB4437" }]}>
          <AntDesign name="google" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Lien vers Sign Up */}
      <View style={styles.signUpText}>
      <Text style={styles.orText}>Do you have an account?</Text> <Text style={styles.signUpLink} onPress={() => {
    navigation.navigate("SignUpScreen");
    console.log("SignUpScreen");
  }}>Sign Up</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3B82F6",
  },
  subtitle: {
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotText: {
    color: "#3B82F6",
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  signInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
    color: "gray",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  socialButton: {
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  signUpText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
  signUpLink: {
    color: "#3B82F6",
    fontWeight: "bold",
    flexDirection:'row',
    justifyContent:'center',
  },
});

export default SignInScreen;
