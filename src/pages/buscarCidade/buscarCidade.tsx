import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const BuscarCidade: React.FC = () => {
  const [cidade, setCidade] = useState('');
  const [clima, setClima] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);

  const buscarClima = async () => {
    try {
      setErro(null);
      const response = await axios.get(`http://192.168.18.9:4000/api/clima/${cidade}`);
      setClima(response.data);
    } catch (err) {
      setErro('Erro ao buscar clima. Verifique o nome da cidade.');
      setClima(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Clima por Cidade</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <Button title="Buscar" onPress={buscarClima} />

      {erro && <Text style={styles.error}>{erro}</Text>}

      {clima && (
        <View style={styles.resultado}>
          <Text style={styles.texto}>Cidade: {clima.cidade.nome} - {clima.cidade.pais}</Text>
          <Text style={styles.texto}>Temperatura: {clima.temperatura}°C</Text>
          <Text style={styles.texto}>Descrição: {clima.descricao}</Text>
          <Text style={styles.texto}>Umidade: {clima.umidade}%</Text>
          <Image source={{ uri: clima.image }} style={styles.imagem} />
        </View>
      )}
    </View>
  );
};

export default BuscarCidade;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  resultado: {
    marginTop: 20,
    alignItems: 'center',
  },
  texto: {
    fontSize: 16,
    marginVertical: 2,
  },
  imagem: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
