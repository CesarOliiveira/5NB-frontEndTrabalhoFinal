import Colors from "@/constants/Colors"
import { StyleSheet, Text, TextInput, View } from "react-native"


export const Formulario = () => {


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Email</Text>
               
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "94%",
        height: 350,
        backgroundColor: 'black',
        borderRadius: 8
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 9,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14
    },
    label: {
        color: Colors.zinc,
        marginBottom: 4,
    },
})