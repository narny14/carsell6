import React, { useState, useEffect } from "react";
import {
  View, StyleSheet, Alert, TextInput, Text, ScrollView, Button,
  ActivityIndicator, Image, TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { useRoute } from "@react-navigation/native";

const ProfileEdit = ({ navigation }) => {
  const route = useRoute();
  const userEmail  = route.params || {};
  const auth = getAuth();
  const user = auth.currentUser;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [loading, setLoading] = useState(false);

  // Récupérer les données de l'utilisateur
  useEffect(() => {
    if (userEmail) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `https://atomeneons.com/get_user_data.php?email=${encodeURIComponent(userEmail)}`
          );
          const responseText = await response.text();
          console.log("Réponse brute du serveur :", responseText);

          const result = JSON.parse(responseText);
          console.log("Données de l'utilisateur :", result);

          if (result.success) {
            setUsername(result.data.name || "");
            setEmail(result.data.email || "");
            setPhone(result.data.phone || "");
            setProfileImage(result.data.profile_picture || null);
          } else {
            console.log("Aucun utilisateur trouvé avec cet email");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      };

      fetchUserData();
    }
  }, [userEmail]);

  // Sélection d'image
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission refusée", "Vous devez autoriser l'accès aux photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setImageType(getMimeType(result.assets[0].uri));
    }
  };

  // Envoi des données au serveur
  const handleUpdate = async () => {
    if (!username.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis !");
      return;
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("action", "update");
      formData.append("email", email);
      formData.append("name", username);
      formData.append("phone", phone);
      formData.append("password", password);
  
      if (profileImage) {
        const type = imageType || "image/jpeg"; // Utiliser un type par défaut si imageType est null
        formData.append("profile_picture", {
          uri: profileImage,
          type: type,
          name: `profile.${type.split("/")[1]}`, // Extraire l'extension du type MIME
        });
      }
  
      const response = await fetch("https://atomeneons.com/update_profile.php", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
  
      const responseText = await response.text();
      console.log("Réponse brute du serveur :", responseText);
  
      if (!responseText) {
        throw new Error("Réponse vide du serveur");
      }
  
      const result = JSON.parse(responseText);
      setLoading(false);
  
      if (result.success) {
        Alert.alert("Succès", "Votre profil a été mis à jour !");
      } else {
        Alert.alert("Erreur", result.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Erreur lors de la mise à jour :", error); // Affiche l'erreur complète
      Alert.alert("Erreur", "Impossible de se connecter au serveur.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formSection}>
        <View style={styles.containers}>
          <Image
            source={profileImage ? { uri: profileImage } : require("../../assets/profile.png")}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.changeButton} onPress={selectImage}>
            <Text style={styles.changeText}>Choisir une image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Username </Text> 
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#FF0000" />
        ) : (
          <Button title="Mettre à jour" onPress={handleUpdate} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  formSection: { marginTop: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: "center" },
  changeButton: { backgroundColor: "#ddd", padding: 10, margin: 5, borderRadius: 5, alignItems: "center" },
  changeText: { fontSize: 14 },
  formField: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 },
});

export default ProfileEdit;