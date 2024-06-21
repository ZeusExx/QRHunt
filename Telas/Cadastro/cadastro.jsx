import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../Firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";

const Cadastro = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000); // Clear the error after 3 seconds

            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [error]);

    const handleSignup = async () => {
        setError(null);
        
        if (user.length < 3) {
            setError('O usuário deve ter pelo menos 3 caracteres.');
            return;
        }

        if (password.length < 5) {
            setError('A senha deve ter pelo menos 5 caracteres.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Cadastro feito com sucesso!');
            setUser('');
            setEmail('');
            setPassword('');
            navigation.navigate('Inicio'); // Redirecionar para a tela de início após o cadastro
        } catch (err) {
            console.error('Erro durante o cadastro:', err); // Exibir o erro completo no console
            let errorMessage = 'Erro ao cadastrar. Verifique suas informações e tente novamente.';
            if (err.code === 'auth/weak-password') {
                errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
            } else if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'O email fornecido já está em uso.';
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Por favor, insira um email válido.';
            }
            setError(errorMessage);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>QRHUNT</Text>
                <Image
                    source={require('../../imgs/qrhunt.png')} // Substitua o caminho pelo seu arquivo de imagem
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.title}>Cadastro</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <Text style={styles.inputLabel}>Usuário</Text>
            <TextInput
                style={styles.input}
                placeholder="Crie um usuário"
                placeholderTextColor="#555555"
                value={user}
                onChangeText={setUser}
                autoCapitalize="none"
                autoCorrect={false}
                textAlign="center"
                maxLength={30} // Define um limite razoável para o comprimento máximo do usuário
            />
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Coloque seu email"
                placeholderTextColor="#555555"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textAlign="center"
            />
            <Text style={styles.inputLabel}>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Crie uma senha"
                placeholderTextColor="#555555"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textAlign="center"
                maxLength={30} // Define um limite razoável para o comprimento máximo da senha
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
                <Text style={styles.loginButtonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerLinkText}>Já tem uma conta? Faça Login</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
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
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10, // Ajuste a margem inferior para reduzir o espaço
    },
    logo: {
        fontSize: 28, // Diminuir tamanho da fonte do logo
        fontWeight: 'bold',
    },
    logoImage: {
        width: 150, // Reduzir o tamanho da imagem do logo
        height: 150,
        marginTop: 10,
    },
    title: {
        fontSize: 28, // Diminuir o tamanho da fonte do título
        fontWeight: 'bold',
        marginBottom: 15, // Reduzir a margem inferior do título
    },
    inputLabel: {
        marginBottom: 2, // Reduzir a margem inferior do rótulo
        color: 'black',
        fontSize: 16, // Diminuir tamanho da fonte do rótulo
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: '90%', // Usar porcentagem para largura do input
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10, // Diminuir o raio da borda
        paddingHorizontal: 8,
        marginBottom: 10,
        fontSize: 14, // Diminuir o tamanho da fonte do input
    },
    loginButton: {
        backgroundColor: '#000000',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8, // Reduzir a margem superior do botão
        width: '90%', // Usar porcentagem para largura do botão
    },
    loginButtonText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 8, // Reduzir a margem superior do link de registro
        alignItems: 'center',
    },
    registerLinkText: {
        fontSize: 14, // Diminuir o tamanho da fonte do link de registro
        color: '#000000',
        textDecorationLine: 'underline',
    },
    error: {
        color: 'red',
        marginBottom: 10, // Reduzir a margem inferior da mensagem de erro
        textAlign: 'center',
    },
});

export default Cadastro;