import { Image, StyleSheet, Text, View } from "react-native"

export const Clima = ({ clima }) => {


    async function getClimaSemana() {
        const response = await fetch(``)
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.contentImage}>
                <Text>{clima?.cidade?.nome}</Text>
                <Image
                    source={{ uri: clima.image }}
                    style={styles.image}
                />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                <Text>Min: {clima.temperaturaMinima}°</Text>
                <Text>Max: {clima.temperaturaMaxima}°</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
        backgroundColor: "#D3D3D3",
        height: 120,
        width: 140
    },
    contentImage: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 44,
        height: 44
    },
})