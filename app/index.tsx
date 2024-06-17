import React from 'react';
import { View, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style='light' />
      <Image
        blurRadius={90}
        source={require('../assets/images/bg.png')}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: '7%', marginHorizontal: 16, zIndex: 50 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderRadius: 20,
              backgroundColor: 'gray',
              height: 60,
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder='Search City'
              placeholderTextColor='white'
              style={{ paddingLeft: 12, flex: 1, fontSize: 20, color: 'white', height: '100%' }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
