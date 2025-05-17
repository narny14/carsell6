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
  const [seats, setSeats] = useState('');
  const [prix, setPrix] = useState('');

  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);

  useEffect(() => {
    axios.get(`https://carsell-backend.onrender.com/voiture`)
      .then(response => setMarques(response.data))
      .catch(error => console.error("Erreur marques:", error))
    .catch(error => console.error("Erreur marques:", error));
  }, []);

  useEffect(() => {
    if (marque) {
      axios.get(`https://carsell-backend.onrender.com/modeles/?marque=${marque}`)
        .then(response => setModeles(response.data))
        .catch(error => console.error("Erreur modèles:", error));
    }
  }, [marque]);

  const handleImagePicker = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permission.granted) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true, // ✅ Permet de sélectionner plusieurs images
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 10, // ✅ Max 10 images (nécessite SDK 49+)
      quality: 1,
      // allowsEditing: false, // ❌ Ne pas activer pour éviter le crop
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...selectedImages].slice(0, 10)); // limite à 10 max
    }
  } else {
    alert('Permission refusée pour accéder à la galerie');
  }
};


 const handleSubmit = async () => {
  if (loading) return;

  setLoading(true);

  const formData = new FormData();

  // Fonction pour obtenir le bon type MIME
  const getMimeType = (uri) => {
    const extension = uri.split('.').pop().toLowerCase();
    switch (extension) {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      default:
        return 'application/octet-stream'; // Sécurité
    }
  };

  images.forEach((imageUri, index) => {
    const mimeType = getMimeType(imageUri);
    const extension = mimeType.split('/')[1];
    formData.append('images', {
      uri: imageUri,
      type: mimeType,
      name: `photo_${index + 1}.${extension}`,
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
  formData.append('seats', seats);
  formData.append('prix', prix);

  try {
    const response = await axios.post(`https://carsell-backend.onrender.com/annonces`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.status === 200) {
      alert('Annonce ajoutée avec succès !');
      // Tu peux ici reset le formulaire si tu veux
    } else {
      alert("Erreur lors de l'ajout de l'annonce");
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
          <Picker.Item key={marque.id} label={marque.nom_marque} value={marque.nom_marque} />
        ))}
      </Picker>

      {marque && (
        <Picker selectedValue={modele} onValueChange={setModele}>
          <Picker.Item label="Sélectionner un modèle" value="" />
          {modeles.map(modele => (
            <Picker.Item key={modele.id} label={modele.nom_modele} value={modele.nom_modele} />
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
      <Text style={styles.label}>Moteur</Text>
<Picker
  selectedValue={moteur}
  onValueChange={setMoteur}
  style={styles.input}
>
  <Picker.Item label="Sélectionner" value="" />
  <Picker.Item label="Bon" value="Bon" />
  <Picker.Item label="Mauvais" value="Mauvais" />
</Picker>

<Text style={styles.label}>Transmission</Text>
<Picker
  selectedValue={transmission}
  onValueChange={setTransmission}
  style={styles.input}
>
  <Picker.Item label="Sélectionner" value="" />
  <Picker.Item label="Bon" value="Bon" />
  <Picker.Item label="Mauvais" value="Mauvais" />
</Picker>

<Text style={styles.label}>Freins</Text>
<Picker
  selectedValue={freins}
  onValueChange={setFreins}
  style={styles.input}
>
  <Picker.Item label="Sélectionner" value="" />
  <Picker.Item label="Bon" value="Bon" />
  <Picker.Item label="Mauvais" value="Mauvais" />
</Picker>

<Text style={styles.label}>Suspension</Text>
<Picker
  selectedValue={suspension}
  onValueChange={setSuspension}
  style={styles.input}
>
  <Picker.Item label="Sélectionner" value="" />
  <Picker.Item label="Bon" value="Bon" />
  <Picker.Item label="Mauvais" value="Mauvais" />
</Picker>

<Text style={styles.label}>Nombre de places</Text>
<Picker
  selectedValue={seats}
  onValueChange={setSeats}
  style={styles.input}
>
  <Picker.Item label="Sélectionner" value="" />
  <Picker.Item label="0" value="0" />
  <Picker.Item label="1" value="1" />
</Picker>

<Text style={styles.label}>Essai Routier</Text>
<Picker
  selectedValue={essaiRoutier}
  onValueChange={setEssaiRoutier}
  style={styles.input}
>
  <Picker.Item label="Sélectionner" value="" />
  <Picker.Item label="Bon" value="Bon" />
  <Picker.Item label="Mauvais" value="Mauvais" />
</Picker>
<Text style={styles.label}>Prix $</Text>
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

      <Button 
  title={loading ? "Chargement..." : "Soumettre l'annonce"} 
  onPress={handleSubmit} 
  disabled={loading} 
/>

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
    height: 70,
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
