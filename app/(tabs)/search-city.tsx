import { DismissKeyboard } from '@/src/components/DismissKeyboard';
import { theme } from '@/src/constants/theme';
import { DB_URL } from '@/src/db/credentials';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface WeatherResponse {
  cidade: {
    nome: string;
    pais: string;
  };
  temperatura: number;
  descricao: string;
  umidade: number;
  image: string;
  temperaturaMin: number;
  temperaturaMax: number;
}

export default function SearchCity() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const checkIfFavorite = async (cityName: string) => {
    try {
      const favoritosString = await AsyncStorage.getItem('favorite_cities');
      if (favoritosString) {
        const favoritos = JSON.parse(favoritosString);
        return favoritos.some((cidade: { nome: string }) => cidade.nome === cityName);
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar favoritos:', error);
      return false;
    }
  };

  const toggleFavorite = async () => {
    if (!weatherData) return;

    try {
      const favoritosString = await AsyncStorage.getItem('favorite_cities');
      let favoritos = favoritosString ? JSON.parse(favoritosString) : [];

      if (isFavorite) {
        favoritos = favoritos.filter(
          (cidade: { nome: string }) => cidade.nome !== weatherData.cidade.nome
        );
        Alert.alert('Sucesso', 'Cidade removida dos favoritos!');
      } else {
        favoritos.push({
          nome: weatherData.cidade.nome,
          pais: weatherData.cidade.pais,
        });
        Alert.alert('Sucesso', 'Cidade adicionada aos favoritos!');
      }

      await AsyncStorage.setItem('favorite_cities', JSON.stringify(favoritos));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos.');
    }
  };

  const searchCity = async (cityName: string) => {
    if (!cityName || cityName.trim().length < 3) {
      setWeatherData(null);
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const encodedCityName = encodeURIComponent(cityName.trim());
      const response = await fetch(`${DB_URL}/api/clima/${encodedCityName}`);
      if (!response.ok) {
        throw new Error('Cidade não encontrada');
      }
      const data = await response.json();
      setWeatherData(data);
      const favorite = await checkIfFavorite(data.cidade.nome);
      setIsFavorite(favorite);
    } catch (error) {
      setError('Erro ao buscar clima. Verifique o nome da cidade.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length >= 3) {
      searchCity(text);
    } else {
      setWeatherData(null);
      setError(null);
    }
  };

  const renderInitialMessage = () => {
    return (
      <View style={styles.emptyStateContainer}>
        <Ionicons name="search" size={64} color={theme.colors.text.light} style={styles.emptyStateIcon} />
        <Text style={styles.emptyStateTitle}>Busque uma cidade</Text>
        <Text style={styles.emptyStateText}>
          Digite o nome da cidade para ver as informações do clima em tempo real
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DismissKeyboard>
        <LinearGradient
          colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
          style={styles.container}
        >
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={theme.colors.text.secondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Digite o nome da cidade..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={theme.colors.text.secondary}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.text.light} style={styles.loader} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : weatherData ? (
            <View style={styles.weatherContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.cityName}>
                  {weatherData.cidade.nome} - {weatherData.cidade.pais}
                </Text>
                <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={28}
                    color={isFavorite ? theme.colors.accent : theme.colors.text.secondary}
                  />
                </TouchableOpacity>
              </View>
              
              <Image 
                source={{ uri: weatherData.image }} 
                style={styles.weatherImage} 
              />
              
              <Text style={styles.temperature}>{weatherData.temperatura}°C</Text>
              <Text style={styles.description}>{weatherData.descricao}</Text>
              
              <View style={styles.minMaxContainer}>
                <Text style={styles.minMax}>Min: {weatherData.temperaturaMin}°C</Text>
                <Text style={styles.minMax}>Max: {weatherData.temperaturaMax}°C</Text>
              </View>
              
              <Text style={styles.humidity}>Umidade: {weatherData.umidade}%</Text>
            </View>
          ) : renderInitialMessage()}
        </LinearGradient>
      </DismissKeyboard>
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
    paddingTop: Platform.OS === 'android' ? theme.spacing.xl : theme.spacing.md
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.input,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.sm
  },
  searchIcon: {
    marginRight: theme.spacing.sm
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text.primary
  },
  loader: {
    marginTop: theme.spacing.xl
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    fontSize: 16,
    paddingHorizontal: theme.spacing.lg
  },
  weatherContainer: {
    padding: theme.spacing.lg,
    alignItems: 'center'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing.lg
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.light,
    flex: 1
  },
  favoriteButton: {
    padding: theme.spacing.xs
  },
  weatherImage: {
    width: 150,
    height: 150,
    marginVertical: theme.spacing.lg
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.text.light,
    marginBottom: theme.spacing.sm
  },
  description: {
    fontSize: 20,
    color: theme.colors.text.light,
    textTransform: 'capitalize',
    marginBottom: theme.spacing.lg
  },
  minMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: theme.spacing.lg
  },
  minMax: {
    fontSize: 18,
    color: theme.colors.text.light
  },
  humidity: {
    fontSize: 18,
    color: theme.colors.text.light
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl
  },
  emptyStateIcon: {
    marginBottom: theme.spacing.lg,
    opacity: 0.8
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.light,
    marginBottom: theme.spacing.md,
    textAlign: 'center'
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.text.light,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24
  }
}); 