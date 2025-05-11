import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const firebaseConfig = {
  apiKey: "AIzaSyDclPfftDPPGhuIsUo0bs2Q9Fa2lFvavyg",
  authDomain: "carsell6-5982a.firebaseapp.com",
  projectId: "carsell6-5982a",
  storageBucket: "carsell6-5982a.firebasestorage.app",
  messagingSenderId: "873771876804",
  appId: "1:873771876804:web:2746dc68b927463842a491"
};

// Initialisation Firebase (éviter l'erreur "already exists")
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Image source={require("../../assets/artboard.png")} style={styles.logo} />
            <Text style={styles.text}>GeRental</Text>
            <View style={styles.authContainer}>
                <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#ccc" autoCapitalize="none" />
                <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#ccc" secureTextEntry />
                <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
                    <Text style={styles.buttonText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.toggleText}>{isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('MainTabs');
            navigation.replace('MainTabs', { userEmail: user.email });
        }, 3000);
        return () => clearTimeout(timer);
    }, [user]);

    return (
        <View style={styles.container}>
            <View style={styles.authContainer}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.emailText}>{user.email}</Text>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]} onPress={handleAuthentication}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        checkUserSession();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                await AsyncStorage.setItem('user', JSON.stringify(user));
            } else {
                setUser(null);
                await AsyncStorage.removeItem('user');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleAuthentication = async () => {
        try {
            if (user) {
                await signOut(auth);
                console.log('Utilisateur déconnecté !');
            } else {
                let userCredential;
                if (isLogin) {
                    userCredential = await signInWithEmailAndPassword(auth, email, password);
                    console.log('Connexion réussie !');
                } else {
                    userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    console.log('Compte créé avec succès !');
                }
                await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
                setUser(userCredential.user);
            }
        } catch (error) {
            console.error('Erreur d’authentification :', error.message);
            alert("Erreur : " + error.message); // Affiche l'erreur à l'utilisateur
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Chargement...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {user ? (
                <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
            ) : (
                <AuthScreen
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    handleAuthentication={handleAuthentication}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#3A7DFF',
        marginBottom: 10,
    },
    input: {
        width: screenWidth - 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        width: screenWidth - 100,
        height: 50,
        backgroundColor: '#3A7DFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    toggleText: {
        fontSize: 16,
        color: '#3A7DFF',
        marginTop: 20,
    },
    authContainer: {
        width: screenWidth - 50,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 5,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3B82F6",
    },
    emailText: {
        fontSize: 16,
        color: "#444",
        marginBottom: 10,
    }
});
