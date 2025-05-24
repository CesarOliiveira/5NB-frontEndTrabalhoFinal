import { theme } from '@/src/constants/theme';
import { DB_URL } from "@/src/db/credentials";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Clima } from "./clima";

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

interface City {
    nome: string;
}

export const CarroselClima: React.FC = () => {
    const [climasCidades, setClimaCidades] = useState<WeatherData[]>([]);

    const cidades: City[] = [
        { nome: "São Paulo" },
        { nome: "Brasilia" },
        { nome: "Rio de Janeiro" },
    ];

    async function getClimaCidades() {
        try {
            const promises = cidades.map(async (cidade) => {
                const response = await fetch(`${DB_URL}/api/clima/${cidade.nome}`);

                if (!response.ok) { 
                    throw new Error(`Erro ao buscar clima para ${cidade.nome}: ${response.statusText}`);
                }

                const data = await response.json();
                return { ...data }; 
            });

            const todosOsClimas = await Promise.all(promises);
            setClimaCidades(todosOsClimas);
        } catch (error) {
            console.error("Erro ao carregar os climas das cidades:", error);
        }
    }

    useEffect(() => {
        getClimaCidades();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={climasCidades}
                renderItem={({ item }) => <Clima clima={item} />}
                horizontal={true}
                contentContainerStyle={styles.listContent}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.cidade.nome}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: theme.spacing.md,
    },
    listContent: {
        paddingHorizontal: theme.spacing.md,
        gap: theme.spacing.lg,
    },
});