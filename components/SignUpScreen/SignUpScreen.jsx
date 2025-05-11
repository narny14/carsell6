import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";


const SignUpScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Bouton Retour */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Titre */}
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Sign up now and enjoy rental ease like never before.
      </Text>

      {/* Champ Name */}
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Ex. Fia Yesia" placeholderTextColor="#bbb" />

      {/* Champ Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        keyboardType="email-address"
        placeholderTextColor="#bbb"
      />

      {/* Champ Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="********"
          secureTextEntry={!passwordVisible}
          placeholderTextColor="#bbb"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <FontAwesome name={passwordVisible ? "eye" : "eye-slash"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Bouton Sign Up */}
      
      
            {/* Bouton Sign In */}
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInText}>Sign Up</Text>
            </TouchableOpacity>

      {/* Ou connexion avec réseaux sociaux */}
      <Text style={styles.orText}>Or sign in with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity  style={[styles.socialButton, { backgroundColor: "#1877F2" }]}>
          <AntDesign name="facebook-square" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#DB4437" }]}>
        <AntDesign name="google" size={24} color="white" />

        </TouchableOpacity>
      </View>

      {/* Lien vers la connexion */}
      <View style={styles.signInContainer}>
  <Text style={styles.signInText}>Already have an account?</Text>
  <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
    <Text style={styles.signInLink}> Sign In</Text>
  </TouchableOpacity>
</View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#357AE8",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#000",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  signUpButton: {
    borderRadius: 10,
    overflow: "hidden",
  },
  gradient: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#888",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 50,
  },
  signInText: {
    textAlign: "center",
    marginTop: 20,
    color: "#444",
  },
  signInLink: {
    color: "#357AE8",
    fontWeight: "bold",
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
});

export default SignUpScreen;
