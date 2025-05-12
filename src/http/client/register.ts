import { DB_URL } from "@/src/db/credentials"
import axios from "axios"
import { router } from "expo-router"
import { Alert } from "react-native"
import { z } from "zod"

export const handleRegexRegister = (name: String, email: String, password: String) => {
    const registerSchema = z.object({
        name: z.string().min(3),
        email: z.string().email("Email incorreto"),
        password: z.string().min(5)
    })

    const register = {
        name: name,
        password: password,
        email: email
    }

    const isCredentials = registerSchema.safeParse(register);

    return isCredentials.success
}

export const postRegister = async (name: String, email: String, passwordHash: String) => {
    var response = await axios.post(`${DB_URL}/user/register`, {
        name,
        email,
        passwordHash
    }).then((response) => {
         console.log("teste")
        return response
       
    }).catch((res) => {
        console.log(res)
        return res
    })

    return response
}

export const handleRegister = async (name: String, email: String, password: String) => {
    var regexRegister = handleRegexRegister(name, email, password);

    if(regexRegister == false){
        Alert.alert("Register", "Alguma informação está incorreta")
        return
    }

    var response = await postRegister(name, email, password);

    if(response.status == 201){
        Alert.alert("Registro", "Registrado com sucesso")
        router.navigate({pathname: "/"})
    }

    if(response.status == 409){
        Alert.alert("Registro", "Já existe uma conta com esse email")
        return
    }
}