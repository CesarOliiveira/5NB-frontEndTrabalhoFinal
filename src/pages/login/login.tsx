import { DismissKeyboard } from "@/src/components/DismissKeyboard";
import { theme } from "@/src/constants/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import logoPng from '@/assets/images/login.png';
import { SignInHandle } from "@/src/http/client/login";
import { useState } from "react";

export const PageLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView style={styles.safeArea}>
            <DismissKeyboard>
                <LinearGradient
                    colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
                    style={styles.container}
                >
                    <View style={styles.header}>
                        <Text style={styles.logoText}>
                            Weather <Text style={{ color: theme.colors.accent }}>APP</Text>
                        </Text>
                        <Text style={styles.slogan}>
                            Bem vindo de volta
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.logoPng}>
                            <Image
                                style={styles.image}
                                source={logoPng}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                placeholder="Digite seu email..."
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                                placeholderTextColor={theme.colors.text.secondary}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                placeholder="Digite sua senha..."
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry
                                placeholderTextColor={theme.colors.text.secondary}
                            />
                        </View>

                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => SignInHandle(email, password)}
                        >
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>

                        <Link href='/(auth)/signup' style={styles.link}>
                            <Text style={styles.linkText}>Ainda não tem uma conta?</Text>
                        </Link>
                    </View>
                </LinearGradient>
            </DismissKeyboard>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.gradient.start
    },
    container: {
        flex: 1,
        paddingTop: theme.spacing.xl
    },
    header: {
        paddingHorizontal: theme.spacing.lg
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text.light,
        marginBottom: theme.spacing.sm
    },
    slogan: {
        fontSize: 34,
        color: theme.colors.text.light,
        marginBottom: theme.spacing.xxl,
    },
    form: {
        flex: 1,
        backgroundColor: theme.colors.background.main,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        ...theme.shadows.lg
    },
    inputContainer: {
        marginBottom: theme.spacing.md
    },
    label: {
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.xs,
        fontSize: 16
    },
    input: {
        backgroundColor: theme.colors.background.input,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        color: theme.colors.text.primary,
        ...theme.shadows.sm
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.lg,
        marginTop: theme.spacing.md,
        ...theme.shadows.md
    },
    buttonText: {
        fontSize: 16,
        color: theme.colors.text.light,
        fontWeight: 'bold'
    },
    link: {
        marginTop: theme.spacing.lg,
        alignSelf: 'center'
    },
    linkText: {
        color: theme.colors.primary,
        fontSize: 16
    },
    image: {
        width: '50%',
        height: 150,
        resizeMode: 'contain'
    },
    logoPng: {
        alignItems: 'center',
        marginVertical: theme.spacing.xl
    }
});
