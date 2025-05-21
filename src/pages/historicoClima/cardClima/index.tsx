import { Image, StyleSheet, Text, View } from "react-native"

export const CardClima = ({ clima }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {clima?.cidade.name}
            </Text>
            <View style={styles.containerList}>
                 <Image
                    source={{ uri: clima.image }}
                    style={styles.image}
                />
                <Text>
                    Min: {clima?.temperaturaMin}°
                </Text>
                <Text>
                    Max: {clima?.temperaturaMax}°
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        height: 120,
        backgroundColor: "#D3D3D3",
        flex: 1,
        marginBottom: 20,
        borderRadius: 9,
        padding: 10
    },
    title: {
        fontSize: 17,
        fontWeight: 600
    },
    containerList: {
        justifyContent: 'space-between',
        paddingRight: 26,
        paddingLeft: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 54,
        height: 54
    },
})