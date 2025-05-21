import colors from "@/constants/Colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import profileIcon from '@/assets/images/profile.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB_URL } from "@/src/db/credentials";

export const PageProfile = () => {
    const [image, setImage] = useState(profileIcon);

    const [user, setUser] = useState()

    async function getUser() {
        var email = await AsyncStorage.getItem("email");
        console.log(email)

        var response = await fetch(`http://192.168.18.9:8080/user/${email}`).then((res)=> {
           return res.json()
        }).catch((err) => {
            return err
        });
       setUser(response)
    } 
    
    useEffect(() => {
        getUser();
    }, [])
    
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.containerImage}>
                            <Image
                                source={image}
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.label}>{user?.name}</Text>
                        <Button
                            title="DESLOGAR"
                            onPress={() => router.replace({
                                pathname: "/(auth)"
                            })}
                        />
                    </View>

                    <View style={styles.form}>

                        <View>
                            <Text style={styles.labelForm}>Nome</Text>
                            <TextInput
                                placeholder="Nome..."
                                style={styles.input}
                                value={user?.name}
                            />
                        </View>


                        <View>
                            <Text style={styles.labelForm}>Email</Text>
                            <TextInput
                                placeholder="Email..."
                                style={styles.input}
                                value={user?.email}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelForm}>Descrição</Text>
                            <TextInput
                                placeholder="Descrição..."
                                style={styles.input}
                                value={user?.description}
                            />
                        </View>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Salvar</Text>
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
        paddingTop: 80,
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: colors.white,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 20,
        fontSize: 20
    },
    containerImage: {
        width: 150,
        height: 150,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
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
    labelForm: {
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
});
