import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LocationContext } from "@/app/_layout";
import { CarroselClima } from "@/src/components/carrosel/carroselClima";
import { useContext, useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';

export const PageTempo = () => {
    const { location } = useContext(LocationContext);

    const [clima, setClima] = useState();

    async function getClima() {
        var response = await fetch(`http://192.168.18.9:8080/api/clima/${location.coords.latitude}/${location.coords.longitude}`).then((res) => {
            return res.json()
        }).catch((err) => {
            return err
        })

        setClima(response)
    }

    useEffect(() => {
        getClima()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={styles.container}>
                <MapView
                    style={styles.maps}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                    />
                </MapView>
            </View>

            <View style={styles.information}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.label}>{clima?.cidade.nome}</Text>
                    <TouchableOpacity onPress={() => getClima()}>
                        <Text style={{color: 'blue'}}>Atualizar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.information_grid}>
                    <View style={styles.contentInformation}>
                        <Text style={styles.informationTitle}>Temperatura</Text>
                        <Text style={styles.infoWeather}>{clima?.temperatura}° Graus</Text>
                    </View>
                    <View style={styles.contentInformation}>
                        <Text style={styles.informationTitle}>Umidade</Text>
                        <Text style={styles.infoWeather}>{clima?.umidade}%</Text>
                    </View>
                    <View style={styles.contentInformation}>
                        <Text style={styles.informationTitle}>Temperatura minima</Text>
                        <Text style={styles.infoWeather}>{clima?.temperaturaMin}° Graus</Text>
                    </View>
                    <View style={styles.contentInformation}>
                        <Text style={styles.informationTitle}>Temperatura máxima</Text>
                        <Text style={styles.infoWeather}>{clima?.temperaturaMax}° Graus</Text>
                    </View>
                </View>

                <Text style={{fontWeight: 600, fontSize: 17, marginBottom: 8}}>
                    Outras Cidades:
                </Text>
                <CarroselClima />

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    maps: {
        width: "80%",
        height: 320,
        borderRadius: 8
    },
    information: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        padding: 16
    },
    label: {
        fontSize: 24,
        fontWeight: 600,
        marginBottom: 20
    },
    information_grid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    contentInformation: {
        width: '48%',
        height: 57,
        backgroundColor: '#D3D3D3',
        marginBottom: 20,
        padding: 4,
        paddingLeft: 9,
        borderRadius: 8
    },
    informationTitle: {
        color: 'black',
        fontWeight: 600,
        fontSize: 15
    },
    infoWeather: {

    }
});
