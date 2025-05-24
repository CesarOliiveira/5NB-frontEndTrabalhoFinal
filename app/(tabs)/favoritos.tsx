import { theme } from '@/src/constants/theme';
import { DB_URL } from '@/src/db/credentials';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

interface FavoriteCity {
  nome: string;
  pais: string;
}

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavoritos = useCallback(async () => {
    try {
      const favoritosString = await AsyncStorage.getItem('favorite_cities');
      if (favoritosString) {
        const cidadesFavoritas: FavoriteCity[] = JSON.parse(favoritosString);
        
        // Buscar dados do clima para cada cidade favorita
        const promessas = cidadesFavoritas.map(async (cidade) => {
          try {
            const response = await fetch(`${DB_URL}/api/clima/${encodeURIComponent(cidade.nome)}`);
            if (!response.ok) throw new Error(`Erro ao buscar clima para ${cidade.nome}`);
            return await response.json();
          } catch (error) {
            console.error(`Erro ao buscar clima para ${cidade.nome}:`, error);
            return null;
          }
        });

        const resultados = await Promise.all(promessas);
        const climasFavoritos = resultados.filter(resultado => resultado !== null);
        setFavoritos(climasFavoritos);
      } else {
        setFavoritos([]);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadFavoritos();
  }, [loadFavoritos]);

  useEffect(() => {
    loadFavoritos();

    // Atualizar dados a cada 5 minutos
    const interval = setInterval(loadFavoritos, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadFavoritos]);

  const removeFavorito = async (cidade: string) => {
    try {
      const favoritosString = await AsyncStorage.getItem('favorite_cities');
      if (favoritosString) {
        const favoritos = JSON.parse(favoritosString);
        const novosFavoritos = favoritos.filter(
          (fav: FavoriteCity) => fav.nome !== cidade
        );
        await AsyncStorage.setItem('favorite_cities', JSON.stringify(novosFavoritos));
        loadFavoritos(); // Recarregar a lista
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
          style={styles.container}
        >
          <ActivityIndicator size="large" color={theme.colors.text.light} />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const renderWeatherCard = ({ item }: { item: WeatherData }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cityName}>{item.cidade.nome} - {item.cidade.pais}</Text>
        <TouchableOpacity 
          onPress={() => removeFavorito(item.cidade.nome)}
          style={styles.removeButton}
        >
          <Ionicons name="heart-dislike" size={24} color={theme.colors.accent} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.weatherInfo}>
          <Text style={styles.temperature}>{item.temperatura}°C</Text>
          <Text style={styles.description}>{item.descricao}</Text>
        </View>
        <View style={styles.minMaxContainer}>
          <Text style={styles.minMax}>Min: {item.temperaturaMin}°C</Text>
          <Text style={styles.minMax}>Max: {item.temperaturaMax}°C</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Cidades Favoritas</Text>
          
          {favoritos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-outline" size={64} color={theme.colors.text.light} />
              <Text style={styles.emptyMessage}>
                Nenhuma cidade favorita ainda.{'\n'}Use a busca para adicionar favoritos!
              </Text>
            </View>
          ) : (
            <FlatList
              data={favoritos}
              renderItem={renderWeatherCard}
              keyExtractor={(item) => item.cidade.nome}
              refreshing={refreshing}
              onRefresh={onRefresh}
              contentContainerStyle={styles.list}
            />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.gradient.start
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? theme.spacing.xl : theme.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.light,
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  list: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    flex: 1,
  },
  removeButton: {
    padding: theme.spacing.xs,
  },
  cardContent: {
    marginTop: theme.spacing.sm,
  },
  weatherInfo: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: 18,
    color: theme.colors.text.secondary,
    textTransform: 'capitalize',
    marginBottom: theme.spacing.sm,
  },
  minMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.sm,
  },
  minMax: {
    fontSize: 16,
    color: theme.colors.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyMessage: {
    fontSize: 18,
    color: theme.colors.text.light,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    lineHeight: 24,
  },
}); 