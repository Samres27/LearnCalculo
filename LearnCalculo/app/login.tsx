// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable } from 'react-native';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/firestoreConfig';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
const auth = getAuth(app);
export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log("login");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            Alert.alert('¡Bienvenido!', `Hola, ${user.email}`);
            router.replace('/');  // Redirige al home
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed up 
        //         const user = userCredential.user;
        //         // ...
        //         console.log(user)
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // ..
        //         console.log(errorCode,errorMessage);
        //     });
    };
    const handleRegister = async () => {
        console.log("registrar");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Cuenta creada', 'Tu cuenta ha sido creada con éxito');
            router.replace('/');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };
    return (
        <View style={styles.container}>
            <View style={[{ height: "60%" }, { justifyContent: "center" }]}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                <TextInput
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
            </View>
            <View style={[{ height: "40%" },
            ]}>
                <Pressable style={[styles.button, { backgroundColor: Colors.light.color1 }]} onPress={handleLogin}>
                    <Text style={styles.textButton}>
                        Iniciar sesión
                    </Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: Colors.light.color5 }]} onPress={handleRegister}>
                    <Text style={styles.textButton}>
                        Registrate
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        alignItems: "center",
        borderRadius: 20,
        height: 70,
        margin: 10,
    },
    textButton: {
        color: "white",
        margin: "auto",
        fontSize: 20,
    }
});
