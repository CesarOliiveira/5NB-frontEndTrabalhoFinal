import { LocationContext } from "@/app/_layout";
import { CarroselClima } from "@/src/components/carrosel/carroselClima";
import { theme } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';

interface WeatherData {
    cidade: {
        nome: string;
        pais: string;
    };
    temperatura: number;
    temperaturaMin: number;
    temperaturaMax: number;
    descricao: string;
    umidade: number;
    image: string;
}

interface Location {
    coords: {
        latitude: number;
        longitude: number;
    };
}

interface LocationContextType {
    location: Location | null;
}

export const PageTempo = () => {
    const context = useContext(LocationContext) as unknown as LocationContextType;
    const location = context?.location;
    const [clima, setClima] = useState<WeatherData | null>(null);

    async function getClima() {
        if (!location) return;
        
        try {
            const response = await fetch(`http://192.168.15.3:4000/api/clima/${location.coords.latitude}/${location.coords.longitude}`);
            const data = await response.json();
            setClima(data);
        } catch (err) {
            console.error('Erro ao buscar clima:', err);
        }
    }

    useEffect(() => {
        if (location) {
            getClima();
        }
    }, [location]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
                style={styles.container}
            >
                <ScrollView 
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.maps}
                            initialRegion={{
                                latitude: location?.coords.latitude || 0,
                                longitude: location?.coords.longitude || 0,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}
                        >
                            {location && (
                                <Marker
                                    coordinate={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                    }}
                                />
                            )}
                        </MapView>
                    </View>

                    <View style={styles.information}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.cityName}>{clima?.cidade?.nome}</Text>
                            <TouchableOpacity 
                                style={styles.refreshButton}
                                onPress={getClima}
                            >
                                <Ionicons name="refresh" size={24} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.information_grid}>
                            <View style={styles.contentInformation}>
                                <Text style={styles.informationTitle}>Temperatura</Text>
                                <Text style={styles.infoWeather}>{clima?.temperatura}°C</Text>
                            </View>
                            <View style={styles.contentInformation}>
                                <Text style={styles.informationTitle}>Umidade</Text>
                                <Text style={styles.infoWeather}>{clima?.umidade}%</Text>
                            </View>
                            <View style={styles.contentInformation}>
                                <Text style={styles.informationTitle}>Temperatura mínima</Text>
                                <Text style={styles.infoWeather}>{clima?.temperaturaMin}°C</Text>
                            </View>
                            <View style={styles.contentInformation}>
                                <Text style={styles.informationTitle}>Temperatura máxima</Text>
                                <Text style={styles.infoWeather}>{clima?.temperaturaMax}°C</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>
                            Outras Cidades:
                        </Text>
                        <View style={styles.carouselContainer}>
                            <CarroselClima />
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.gradient.start
    },
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xxl,
    },
    mapContainer: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xl,
    },
    maps: {
        width: "90%",
        height: 250,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.md,
    },
    information: {
        flex: 1,
        backgroundColor: theme.colors.background.main,
        borderTopRightRadius: theme.borderRadius.xl,
        borderTopLeftRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        paddingBottom: theme.spacing.xxl,
        ...theme.shadows.lg,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        paddingTop: theme.spacing.md,
    },
    cityName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
    refreshButton: {
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.background.input,
        borderRadius: theme.borderRadius.full,
        ...theme.shadows.sm,
    },
    information_grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xl,
        gap: theme.spacing.md,
    },
    contentInformation: {
        width: '47%',
        backgroundColor: theme.colors.background.input,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.sm,
    },
    informationTitle: {
        color: theme.colors.text.secondary,
        fontSize: 14,
        marginBottom: theme.spacing.xs,
    },
    infoWeather: {
        color: theme.colors.text.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.lg,
        marginTop: theme.spacing.md,
    },
    carouselContainer: {
        marginBottom: theme.spacing.xxl,
    },
});
