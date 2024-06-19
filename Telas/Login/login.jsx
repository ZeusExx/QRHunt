import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../Firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Login feito com sucesso!");
            setEmail('');
            setPassword('');
            navigation.navigate('Inicio'); // Redirecionar para a tela de início
        } catch (err) {
            console.error('Erro durante o login:', err); // Exibir o erro completo no console
            // Apenas para fins de demonstração, você pode escolher como lidar com o erro aqui
            Alert.alert('Erro ao fazer login', 'Verifique suas credenciais e tente novamente.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>QRHUNT</Text>
                <Image
                    source={require('../../imgs/qrhunt.png')} // Substitua o caminho pelo seu arquivo de imagem
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        placeholderTextColor="#555555" // Cor do placeholder
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        textAlign="center" // Alinha o texto no centro horizontalmente
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Coloque sua senha"
                        placeholderTextColor="#555555" // Cor do placeholder
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        textAlign="center" // Alinha o texto no centro horizontalmente
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.registerLink}
                        onPress={() => navigation.navigate('Cadastro')}
                    >
                        <Text style={styles.registerLinkText}>Não tem uma conta? Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        marginBottom: 20,
    },
    logo: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    logoImage: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400, // Limitar a largura máxima do formulário para evitar esticamento excessivo em telas maiores
        borderRadius: 10, // Borda redonda nos cantos
        padding: 20, // Espaçamento interno
        elevation: 4, // Sombra para destacar o formulário
    },
    inputContainer: {
        marginBottom: 12,
    },
    inputLabel: {
        marginBottom: 4,
        color: 'black',
        fontSize: 20, // Tamanho do texto do label
        textAlign: 'center', // Centraliza o texto do label horizontalmente
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: '#ffffff', // Background branco para os inputs
        borderWidth: 1,
        borderColor: 'black', // Borda preta
        borderRadius: 20, // Borda redonda nos cantos
        paddingHorizontal: 8,
        fontSize: 16, // Tamanho do texto do placeholder
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    loginButton: {
        backgroundColor: '#000000', // Cor de fundo preta para o botão de login
        paddingVertical: 12,
        borderRadius: 20, // Borda redonda nos cantos
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
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
});

export default Login;
