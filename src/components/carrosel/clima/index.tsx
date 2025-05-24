import { theme } from '@/src/constants/theme';
import { Image, StyleSheet, Text, View } from "react-native";

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

interface ClimaProps {
    clima: WeatherData;
}

export const Clima: React.FC<ClimaProps> = ({ clima }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cityName}>{clima?.cidade?.nome}</Text>
                <Image
                    source={{ uri: clima?.image }}
                    style={styles.image}
                />
                <View style={styles.temperatureContainer}>
                    <Text style={styles.temperatureText}>Min: {clima?.temperaturaMin}°</Text>
                    <Text style={styles.temperatureText}>Max: {clima?.temperaturaMax}°</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 180,
    },
    card: {
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        ...theme.shadows.md,
    },
    cityName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginVertical: theme.spacing.sm,
    },
    temperatureContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing.sm,
    },
    temperatureText: {
        fontSize: 14,
        color: theme.colors.text.secondary,
    },
});