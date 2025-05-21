import { FlatList, SafeAreaView, StyleSheet, View } from "react-native"
import { CardClima } from "./cardClima"
import { Formulario } from "./formulario/formulario"

export const HistoricoClima = () => {
    const climas = [
        {
            cidade: {
                name: "Embu"
            },
            temperaturaMin: "13.23",
            temperaturaMax: "24.89",
            image: "https://openweathermap.org/img/wn/04n@2x.png"
        },
        {
            cidade: {
                name: "Teste"
            },
            temperaturaMin: "19.23",
            temperaturaMax: "24.39",
            image: "https://openweathermap.org/img/wn/04n@2x.png"
        }
    ]


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.containerForm}>
                <FlatList
                    data={climas}
                    renderItem={({ item }) => <CardClima clima={item} />}
                    horizontal={false}
                    style={styles.lista}
                />
            </View>
            <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 40}}>
                <Formulario />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerForm: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'relative'
    },
    lista: {
        width: "90%",
        marginBottom: 20
    }
})