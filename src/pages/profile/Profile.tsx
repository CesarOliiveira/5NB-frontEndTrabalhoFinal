import { DismissKeyboard } from "@/src/components/DismissKeyboard";
import { theme } from "@/src/constants/theme";
import { DB_URL } from "@/src/db/credentials";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface UserData {
  name: string;
  email: string;
  description?: string;
}

export const PageProfile = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<UserData>({
      name: '',
      email: '',
      description: '',
    });

    async function getUser() {
        try {
            setLoading(true);
            const email = await AsyncStorage.getItem("email");
            if (!email) {
                Alert.alert("Erro", "Usuário não está logado");
                router.replace("/(auth)");
                return;
            }

            const response = await fetch(`${DB_URL}/user/${email}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do usuário');
            }
            const userData = await response.json();
            setUser(userData);
            setFormData({
                name: userData.name || '',
                email: userData.email || '',
                description: userData.description || '',
            });
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
            Alert.alert("Erro", "Não foi possível carregar os dados do usuário");
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        try {
            await AsyncStorage.removeItem("email");
            await AsyncStorage.removeItem("token");
            router.replace("/(auth)");
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            Alert.alert("Erro", "Não foi possível fazer logout");
        }
    }

    async function handleSave() {
        if (!user?.email) return;

        try {
            setSaving(true);
            const response = await fetch(`${DB_URL}/user/${user.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar dados');
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            Alert.alert("Sucesso", "Dados atualizados com sucesso!");
        } catch (error) {
            console.error('Erro ao salvar:', error);
            Alert.alert("Erro", "Não foi possível atualizar os dados");
        } finally {
            setSaving(false);
        }
    }
    
    useEffect(() => {
        getUser();
    }, []);
    
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
                    style={styles.gradient}
                >
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.colors.text.light} />
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <DismissKeyboard>
                <LinearGradient
                    colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
                    style={styles.gradient}
                >
                    <View style={styles.header}>
                        <View style={styles.containerImage}>
                            <Ionicons name="person" size={60} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.label}>{formData.name}</Text>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={handleLogout}
                        >
                            <Ionicons name="log-out-outline" size={20} color={theme.colors.text.light} />
                            <Text style={styles.logoutText}>DESLOGAR</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.formTitle}>Informações Pessoais</Text>
                        
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelForm}>Nome</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person-outline" size={20} color={theme.colors.text.secondary} style={styles.inputIcon} />
                                <TextInput
                                    placeholder="Nome..."
                                    style={styles.input}
                                    value={formData.name}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                                    placeholderTextColor={theme.colors.text.secondary}
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.labelForm}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={20} color={theme.colors.text.secondary} style={styles.inputIcon} />
                                <TextInput
                                    placeholder="Email..."
                                    style={[styles.input, { opacity: 0.7 }]}
                                    value={formData.email}
                                    editable={false}
                                    placeholderTextColor={theme.colors.text.secondary}
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.labelForm}>Descrição</Text>
                            <View style={[styles.inputWrapper, { alignItems: 'flex-start', paddingTop: 12 }]}>
                                <Ionicons name="document-text-outline" size={20} color={theme.colors.text.secondary} style={styles.inputIcon} />
                                <TextInput
                                    placeholder="Conte um pouco sobre você..."
                                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                                    value={formData.description}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                                    multiline
                                    numberOfLines={4}
                                    placeholderTextColor={theme.colors.text.secondary}
                                />
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={[styles.button, saving && styles.buttonDisabled]}
                            onPress={handleSave}
                            disabled={saving}
                        >
                            {saving ? (
                                <ActivityIndicator color={theme.colors.text.light} />
                            ) : (
                                <>
                                    <Ionicons name="save-outline" size={20} color={theme.colors.text.light} style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>Salvar Alterações</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </DismissKeyboard>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.gradient.start
    },
    gradient: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingTop: theme.spacing.xxl,
        paddingBottom: theme.spacing.xl,
        alignItems: 'center',
    },
    label: {
        color: theme.colors.text.light,
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    containerImage: {
        width: 120,
        height: 120,
        backgroundColor: theme.colors.background.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        ...theme.shadows.lg
    },
    form: {
        flex: 1,
        backgroundColor: theme.colors.background.main,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        ...theme.shadows.lg
    },
    formTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xl,
    },
    inputContainer: {
        marginBottom: theme.spacing.lg,
    },
    labelForm: {
        color: theme.colors.text.secondary,
        fontSize: 16,
        marginBottom: theme.spacing.sm,
        fontWeight: '500',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background.input,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
        ...theme.shadows.sm
    },
    inputIcon: {
        marginRight: theme.spacing.sm,
    },
    input: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        fontSize: 16,
        color: theme.colors.text.primary,
    },
    button: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        marginTop: theme.spacing.xl,
        ...theme.shadows.md
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonIcon: {
        marginRight: theme.spacing.sm,
    },
    buttonText: {
        fontSize: 16,
        color: theme.colors.text.light,
        fontWeight: 'bold',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.accent,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.full,
        marginTop: theme.spacing.md,
        ...theme.shadows.sm
    },
    logoutText: {
        color: theme.colors.text.light,
        fontWeight: 'bold',
        marginLeft: theme.spacing.sm,
    }
});
