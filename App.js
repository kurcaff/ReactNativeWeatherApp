import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';

const API_KEY = '1ec31f4d055aba5e1e5e54e0a2d26ce4'; // Replace with your actual API key

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      setError('City not found');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={fetchWeather} />
      {error && <Text style={styles.error}>{error}</Text>}
      {weather && (
        <View style={styles.weatherInfo}>
          <Text>Temperature: {weather.main.temp}°C</Text>
          <Text>Weather: {weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    width: '100%',
    marginBottom: 16,
  },
  weatherInfo: {
    marginTop: 20,
  },
  error: {
    color: 'red',
  },
});
