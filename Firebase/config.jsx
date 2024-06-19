import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Importe necessário
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAspADeHSl7L2NmnYwSKb2I13anIuS0FjA",
  authDomain: "qrhunt-001.firebaseapp.com",
  projectId: "qrhunt-001",
  storageBucket: "qrhunt-001.appspot.com",
  messagingSenderId: "337222098490",
  appId: "1:337222098490:web:0f0334dc10ac6b778a9f03",
  measurementId: "G-RGM86B2SKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) // Configuração do AsyncStorage como persistência
});
const db = getFirestore(app);

export { auth, db };
