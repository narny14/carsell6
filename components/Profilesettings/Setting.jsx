import * as React from "react";
import { 
  View, StyleSheet, Image, Dimensions, Text, ActivityIndicator 
} from "react-native";
import SectionHeader from "./SectionHeader";
import TabSelector from "./TabSelector";
import ContentPreferences from "./ContentPreferences";
import AppPreferences from "./AppPreferences";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Setting = ({ navigation }) => {
  const route = useRoute();
  const userEmail = route.params || "Guest"; // Récupération du paramètre

  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://atomeneons.com/get_user_data.php?email=${encodeURIComponent(userEmail)}`
      );
      const result = await response.json();

      if (result.success) {
        setUserData(result.data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      setError("Erreur lors de la récupération des données.");
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (userEmail !== "Guest") {
      fetchUserData();
    } else {
      setLoading(false);
      setUserData(null);
    }
  }, [userEmail]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8D76" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <View style={styles.profiletop}>
            <Pressable onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </Pressable>
            {/* Correction : Assurer que userEmail est bien encapsulé dans <Text> */}
            <Text style={styles.profileText}>{userData?.name ?? userEmail}</Text>

            <MaterialIcons name="doorbell" size={24} color="#000" style={styles.menuIcon} />
          </View>
          <Image
            source={userData?.profile_picture ? { uri: userData.profile_picture } : require('../../assets/profile.png')}
            style={styles.profileImage}
          />
        </View>
      </View>

      <Pressable onPress={() => navigation.navigate('ProfileEdit', userEmail )}>
        <SectionHeader title="Edit Profile" style={styles.editProfileButton} />
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TabSelector />
        <SectionHeader title="Content" style={styles.sectionHeader} />
        <ContentPreferences />
        <SectionHeader title="Preferences" style={styles.sectionHeader} />
        <AppPreferences />
      </ScrollView>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#357AE8",
  },
  profileHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  profiletop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
  },
  backIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  profileText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  menuIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  editProfileButton: {
    alignSelf: "center",
    marginTop: 20,
  },
  sectionHeader: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    padding: 10,
    alignItems: "center",
  },
  errorText: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
  },
});

export default Setting;

