import colors from "@/constants/Colors";
import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { useState } from "react";
import { handleRegexRegister, handleRegister } from "@/src/http/client/register";


export const PageSignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>

                        <Pressable
                            style={styles.backButton}
                            onPress={() => { router.back() }}
                        >
                            <Ionicons name="arrow-back" size={24} color={colors.white} />
                        </Pressable>

                        <Text style={styles.logoText}>
                            ONG <Text style={{ color: colors.green }}>APP</Text>
                        </Text>
                        <Text style={styles.slogan}>
                            Criar uma conta
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.label}>Nome Completo</Text>
                            <TextInput
                                placeholder="Digite seu nome..."
                                style={styles.input}
                                onChangeText={setName}
                                value={name}
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
                                placeholder="Digite sua senha..."
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={() => handleRegister(name, email, password)}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>

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
    backButton: {
        backgroundColor: colors.blue,
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8
    }

});
