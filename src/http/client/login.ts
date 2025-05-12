
import axios from "axios"
import { router } from "expo-router"
import { Alert } from "react-native"
import { z } from "zod"


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
    var response = await axios.post(`http://192.168.18.9:8080/user/login`, {
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

export const SignInHandle = async (email : String, password : String) => {

    var regexLogin = handleRegexLogin(email, password);

    if (regexLogin == false) {
        Alert.alert("Login", `${MESSAGE_FAILED}`)
        return false
    }

    const response = await handleLogin(email, password);

    if (isResponseTrue(response)) {
        router.replace({ pathname: "/(tabs)/index" })
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
