import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { PaperProvider } from 'react-native-paper';

const FormulaireAnnonce = () => {
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [autreModele, setAutreModele] = useState('');
  const [showAutreModele, setShowAutreModele] = useState(false);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false); // Ajout pour le chargement

const resetForm = () => {
  setMarque('');
  setModele('');
  setAutreModele('');
  setShowAutreModele(false);
  setImages([]);
  setConfortOptions({
    climatisation: 'non',
    siegesChauffants: 'non',
    reglageSieges: 'non',
    toitOuvrant: 'non',
    volantChauffant: 'non',
    demarrageSansCle: 'non',
    coffreElectrique: 'non',
    storesPareSoleil: 'non',
  });
  setMoteur('');
  setTransmission('');
  setFreins('');
  setSuspension('');
  setEssaiRoutier('');
  setPrix('');
};

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
    axios.get('https://carsell-backend.onrender.com/voiture/') // Remplacez par votre API
      .then(response => {
        setMarques(response.data);
      })
      .catch(error => {
        console.error("Erreur de récupération des marques", error);
      });
  }, []);

  useEffect(() => {
    if (marque) {
      axios.get(`https://carsell-backend.onrender.com/modeles/?marque=${marque}`) // Remplacez par votre API
        .then(response => {
          setModeles(response.data);
        })
        .catch(error => {
          console.error("Erreur de récupération des modèles", error);
        });
    }
  }, [marque]);

  const handleModeleChange = (value) => {
    if (value === 'autres') {
      setShowAutreModele(true);
      setModele('');
    } else {
      setShowAutreModele(false);
      setModele(value);
    }
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission de la galerie requise');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 1,
    });

    if (!result.canceled) {
      const validImages = result.assets.filter((image) =>
        image.uri.endsWith('.png') || image.uri.endsWith('.jpeg') || image.uri.endsWith('.jpg')
      );

      if (validImages.length > 0) {
        setImages((prevImages) => [...prevImages, ...validImages]);
      } else {
        alert('Veuillez sélectionner uniquement des fichiers PNG ou JPEG');
      }
    }
  };

  const handleSubmit = () => {
    setLoading(true); // Quand on commence l'envoi
    const formData = new FormData();
  
    formData.append('marque', marque);
    formData.append('modele', showAutreModele ? autreModele : modele);
    Object.keys(confortOptions).forEach((key) => {
      formData.append(key, confortOptions[key]);
    });
    formData.append('moteur', moteur);
    formData.append('transmission', transmission);
    formData.append('freins', freins);
    formData.append('suspension', suspension);
    formData.append('essaiRoutier', essaiRoutier);
    formData.append('prix', prix);

    images.forEach((image, index) => {
      formData.append('images[]', {
        uri: image.uri,
        type: 'image/jpeg',
        name: `photo_${index}.jpg`,
      });
    });

    axios.post('https://carsell-backend.onrender.com/upload-annonce', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response.data);
      alert('Annonce envoyée avec succès !');
      resetForm(); // Réinitialiser les champs
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de l\'annonce :', error);
      alert('Erreur lors de l\'envoi de l\'annonce');
    })
    .finally(() => {
      setLoading(false); // Dans tous les cas, on arrête le loading
    });
  };
  

  return (
    
    <PaperProvider>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Marque</Text>
      <Picker
        selectedValue={marque}
        style={styles.picker}
        onValueChange={(itemValue) => setMarque(itemValue)}
      >
        <Picker.Item label="Sélectionnez la marque" value="" />
        {marques.map((marqueItem, index) => (
          <Picker.Item key={index} label={marqueItem} value={marqueItem} />
        ))}
      </Picker>

      {marque && (
        <>
          <Text style={styles.header}>Modèle</Text>
          <Picker
            selectedValue={modele}
            style={styles.picker}
            onValueChange={handleModeleChange}
          >
            <Picker.Item label="Sélectionnez le modèle" value="" />
            {modeles.map((modeleItem, index) => (
              <Picker.Item key={index} label={modeleItem} value={modeleItem} />
            ))}
            <Picker.Item label="Autres" value="autres" />
          </Picker>

          {showAutreModele && (
            <TextInput
              style={styles.input}
              placeholder="Entrez le nom du modèle"
              value={autreModele}
              onChangeText={setAutreModele}
            />
          )}
        </>
      )}

<Text style={styles.header}>🛋️ Confort et commodités</Text>
        {[
          ['climatisation', 'Climatisation automatique / bi-zone / tri-zone'],
          ['siegesChauffants', 'Sièges chauffants / ventilés / massants'],
          ['reglageSieges', 'Réglage électrique des sièges avec mémoire'],
          ['toitOuvrant', 'Toit ouvrant / panoramique'],
          ['volantChauffant', 'Volant chauffant'],
          ['demarrageSansCle', 'Démarrage sans clé (keyless start)'],
          ['coffreElectrique', 'Ouverture électrique du coffre'],
          ['storesPareSoleil', 'Stores pare-soleil automatiques']
        ].map(([key, label]) => (
          <View key={key} style={styles.optionContainer}>
            <Text>{label}</Text>
            <Picker
              selectedValue={confortOptions[key]}
              onValueChange={(value) => setConfortOptions({ ...confortOptions, [key]: value })}
            >
              <Picker.Item label="Sélectionner" value="" />
              <Picker.Item label="Oui" value="1" />
              <Picker.Item label="Non" value="0" />
            </Picker>
          </View>
        ))}

      <Text style={styles.header}>🔧 Caractéristiques techniques</Text>
      <View style={styles.optionContainer}>
        <Text>État du moteur</Text>
        <Picker selectedValue={moteur} onValueChange={(itemValue) => setMoteur(itemValue)}>
          <Picker.Item label="Bon" value="Bon" />
          <Picker.Item label="Moyen" value="Moyen" />
          <Picker.Item label="Défectueux" value="Défectueux" />
        </Picker>
      </View>

      <View style={styles.optionContainer}>
        <Text>Type de transmission</Text>
        <Picker selectedValue={transmission} onValueChange={(itemValue) => setTransmission(itemValue)}>
          <Picker.Item label="Manuelle" value="Manuelle" />
          <Picker.Item label="Automatique" value="Automatique" />
        </Picker>
      </View>

      <View style={styles.optionContainer}>
        <Text>État des freins</Text>
        <Picker selectedValue={freins} onValueChange={(itemValue) => setFreins(itemValue)}>
          <Picker.Item label="Bon" value="Bon" />
          <Picker.Item label="Moyen" value="Moyen" />
          <Picker.Item label="À réparer" value="À réparer" />
        </Picker>
      </View>

      <View style={styles.optionContainer}>
        <Text>Suspension</Text>
        <Picker selectedValue={suspension} onValueChange={(itemValue) => setSuspension(itemValue)}>
          <Picker.Item label="Bon" value="Bon" />
          <Picker.Item label="Moyen" value="Moyen" />
          <Picker.Item label="Défectueux" value="Défectueux" />
        </Picker>
      </View>

      <View style={styles.optionContainer}>
        <Text>Le véhicule a-t-il été testé sur route ?</Text>
        <Picker selectedValue={essaiRoutier} onValueChange={(itemValue) => setEssaiRoutier(itemValue)}>
          <Picker.Item label="Oui" value="Oui" />
          <Picker.Item label="Non" value="Non" />
        </Picker>
      </View>

      <Text style={styles.header}>Prix</Text>
      <TextInput
        style={styles.input}
        placeholder="Prix du véhicule"
        value={prix}
        onChangeText={setPrix}
        keyboardType="numeric"
      />

      <Button title="Ajouter des photos" onPress={handleImagePicker} />
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </View>

      <Button title={loading ? "Chargement..." : "Soumettre l'annonce"} onPress={handleSubmit} disabled={loading} />

    <Text style={styles.headerbottom}>

    </Text>
    </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  optionContainer: {
    marginBottom: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    margin: 5,
  },
  headerbottom: {
    width: 80,
    height: 150,
    margin: 5,
  },
});

export default FormulaireAnnonce;
