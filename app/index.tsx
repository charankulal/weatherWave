import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>
            Welcome to WeatherWave
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginTop: 8 }}>
            Stay informed about the latest weather conditions.
          </Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
            Today's Weather
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginTop: 8 }}>
            Check out the weather updates for today.
          </Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
            Weekly Forecast
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginTop: 8 }}>
            Plan your week with our accurate weather forecasts.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
