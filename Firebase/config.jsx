import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';

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
const auth = getAuth(app); // Obter a instância de autenticação

// Configurar persistência
const persistence = getReactNativePersistence(ReactNativeAsyncStorage);
auth.setPersistence(persistence);

const db = getFirestore(app);

export { auth, db };

