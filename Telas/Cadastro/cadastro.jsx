import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../Firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importar função de criação de usuário

const Cadastro = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleSignup = async () => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Cadastro feito com sucesso!');
      setEmail('');
      setPassword('');
      navigation.navigate('Inicio'); // Redirecionar para a tela de início após o cadastro
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={user}
        onChangeText={setUser}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.loginButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerLinkText}>Já tem uma conta? Faça Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5cb85c', // Background verde
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: '#ffffff', // Background branco para os inputs
    borderWidth: 1,
    borderColor: 'black', // Borda preta
    borderRadius: 20, // Borda redonda nos cantos
    paddingHorizontal: 8,
    marginBottom: 12,
    fontSize: 16, // Tamanho do texto do placeholder
  },
  loginButton: {
    backgroundColor: '#000000', // Cor de fundo preta para o botão de login
    paddingVertical: 12,
    borderRadius: 20, // Borda redonda nos cantos
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    marginTop: 10,
    width: '100%',
  },
  loginButtonText: {
    fontSize: 18,
    color: '#ffffff', // Cor do texto branco
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 10,
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  registerLinkText: {
    fontSize: 16,
    color: '#000000', // Cor do texto preto
    textDecorationLine: 'underline', // Adiciona sublinhado para parecer um link
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Cadastro;
