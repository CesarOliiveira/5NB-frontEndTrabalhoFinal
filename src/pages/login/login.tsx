import colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

import logoPng from '@/assets/images/login.png'
import { useState } from "react";


import { SignInHandle } from "../../http/client/login";

export const PageLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.logoText}>
                            Weather <Text style={{ color: colors.green }}>APP.</Text>
                        </Text>
                        <Text style={styles.slogan}>
                            Bem vindo de volta.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.logoPng}>
                            <Image
                                style={styles.image}
                                source={logoPng}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                placeholder="Digite seu email..."
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                placeholder="Digite seu senha..."
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={() => SignInHandle(email, password)}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>

                        <Link href='/(auth)/signup' style={styles.link}>
                            <Text>Ainda não tem uma conta?</Text>
                        </Link>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: colors.black
    },
    header: {
        paddingLeft: 18,
        paddingRight: 14
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8
    },
    slogan: {
        fontSize: 34,
        color: colors.white,
        marginBottom: 43,
    },
    form: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14
    },
    label: {
        color: colors.zinc,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 9,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14
    },
    button: {
        backgroundColor: colors.blue,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 4
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    link: {
        color: colors.blueSecondary,
        textAlign: 'center',
        marginTop: 16
    },
    image: {
        width: '50%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoPng: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 24
    }
});
