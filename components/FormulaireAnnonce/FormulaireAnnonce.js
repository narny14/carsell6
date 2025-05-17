// src/FormulaireAnnonce.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '../../config';  // Import du fichier config.js

const FormulaireAnnonce = () => {
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [autreModele, setAutreModele] = useState('');
  const [showAutreModele, setShowAutreModele] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [confortOptions, setConfortOptions] = useState({
    climatisation: 'non',
    siegesChauffants: 'non',
    reglageSieges: 'non',
    toitOuvrant: 'non',
    volantChauffant: 'non',
    demarrageSansCle: 'non',
    coffreElectrique: 'non',
    storesPareSoleil: 'non',
  });

  const [moteur, setMoteur] = useState('');
  const [transmission, setTransmission] = useState('');
  const [freins, setFreins] = useState('');
  const [suspension, setSuspension] = useState('');
  const [essaiRoutier, setEssaiRoutier] = useState('');
  const [prix, setPrix] = useState('');

  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/voiture`)
      .then(response => setMarques(response.data))
      .catch(error => console.error("Erreur marques:", error));
  }, []);

  useEffect(() => {
    if (marque) {
      axios.get(`${API_URL}/modeles/?marque=${marque}`)
        .then(response => setModeles(response.data))
        .catch(error => console.error("Erreur modèles:", error));
    }
  }, [marque]);

  const handleImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.cancelled) {
        setImages([...images, result.uri]);
      }
    } else {
      alert('Permission refusée pour accéder à la galerie');
    }
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    images.forEach((imageUri, index) => {
      formData.append('images', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `photo_${index + 1}.jpg`,
      });
    });

    // Ajout des autres données
    formData.append('marque', marque);
    formData.append('modele', modele);
    formData.append('autreModele', autreModele);
    formData.append('confortOptions', JSON.stringify(confortOptions));
    formData.append('moteur', moteur);
    formData.append('transmission', transmission);
    formData.append('freins', freins);
    formData.append('suspension', suspension);
    formData.append('essaiRoutier', essaiRoutier);
    formData.append('prix', prix);

    try {
      const response = await axios.post(`${API_URL}/annonces`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        alert('Annonce ajoutée avec succès !');
      } else {
        alert('Erreur lors de l\'ajout de l\'annonce');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulaire d'Annonce</Text>

      <Picker selectedValue={marque} onValueChange={setMarque}>
        <Picker.Item label="Sélectionner une marque" value="" />
        {marques.map(marque => (
          <Picker.Item key={marque.id} label={marque.nom} value={marque.nom} />
        ))}
      </Picker>

      {marque && (
        <Picker selectedValue={modele} onValueChange={setModele}>
          <Picker.Item label="Sélectionner un modèle" value="" />
          {modeles.map(modele => (
            <Picker.Item key={modele.id} label={modele.nom} value={modele.nom} />
          ))}
        </Picker>
      )}

      {modele === 'Autre' && (
        <TextInput
          style={styles.input}
          placeholder="Entrez le modèle"
          value={autreModele}
          onChangeText={setAutreModele}
        />
      )}

      {/* Options de confort */}
      {Object.keys(confortOptions).map((key, index) => (
        <View key={index} style={styles.checkboxContainer}>
          <Text>{key}</Text>
          <Picker
            selectedValue={confortOptions[key]}
            onValueChange={(value) => setConfortOptions({ ...confortOptions, [key]: value })}
          >
            <Picker.Item label="Oui" value="oui" />
            <Picker.Item label="Non" value="non" />
          </Picker>
        </View>
      ))}

      {/* Autres champs */}
      <TextInput
        style={styles.input}
        placeholder="Moteur"
        value={moteur}
        onChangeText={setMoteur}
      />
      <TextInput
        style={styles.input}
        placeholder="Transmission"
        value={transmission}
        onChangeText={setTransmission}
      />
      <TextInput
        style={styles.input}
        placeholder="Freins"
        value={freins}
        onChangeText={setFreins}
      />
      <TextInput
        style={styles.input}
        placeholder="Suspension"
        value={suspension}
        onChangeText={setSuspension}
      />
      <TextInput
        style={styles.input}
        placeholder="Essai Routier"
        value={essaiRoutier}
        onChangeText={setEssaiRoutier}
      />
      <TextInput
        style={styles.input}
        placeholder="Prix"
        value={prix}
        onChangeText={setPrix}
        keyboardType="numeric"
      />

      <Button title="Sélectionner des images" onPress={handleImagePicker} />
      <View style={styles.imageContainer}>
        {images.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={styles.imagePreview} />
        ))}
      </View>

      <Button title={loading ? "Chargement..." : "Soumettre l'annonce"} onPress={handleSubmit} disabled={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  checkboxContainer: {
    marginVertical: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default FormulaireAnnonce;
