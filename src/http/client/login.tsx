
import { UserContext } from "@/app/_layout"
import axios from "axios"
import { router } from "expo-router"
import { useContext } from "react"
import { Alert } from "react-native"
import { z } from "zod"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DB_URL } from "@/src/db/credentials"


const MESSAGE_FAILED = "Email ou senha no formato incorreto"

export const handleRegexLogin = (email : String, password : String) => {
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(5)
    });

    const login = {
        email: email,
        password: password
    }

    const isCredentials = loginSchema.safeParse(login);

    console.log(isCredentials)

    return isCredentials.success;
}


export const handleLogin = async (email : String, password : String) => {
    var response = await axios.post(`${DB_URL}/user/login`, {
        email: `${email}`,
        passwordHash: `${password}`
    })
        .then(response => {
            return response.data
        })
        .catch(err => {
            return `Error, ${MESSAGE_FAILED}`
        })

    return response
}

export const getUser = async (email : String) => {
    await AsyncStorage.setItem("email", email)
}   

export const SignInHandle = async (email : String, password : String) => {
    

    var regexLogin = handleRegexLogin(email, password);

    if (regexLogin == false) {
        Alert.alert("Login", `${MESSAGE_FAILED}`)
        return false
    }

    const response = await handleLogin(email, password);

    if (isResponseTrue(response)) {
        getUser(response.email)
        router.replace({ pathname: "/(tabs)" })
        return
    }
}

export const isResponseTrue = (response : IResponse) => {
    return response.status == true
}

export interface IResponse {
    email: string,
    token: string,
    status: boolean
}
