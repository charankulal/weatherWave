import React, { useCallback, useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchForecastData, fetchLocations } from "@/api/weather";
import { locationData, weatherData, weatherImages } from "@/constants";

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [showSearch, toggleSearch] = useState(false);
  const [weather, setWeather] = useState(weatherData);

  const handleLocation = (location: any) => {
    setLocations([]);
    toggleSearch(false);
    fetchForecastData({
      cityName: location.name,
      days: 7,
    }).then((data) => {
      setWeather(data);
      console.log(data)
    });
  };

  const handleSearch = (value: any) => {
    // fetch locations using api
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data:any) => {
        setLocations(data );
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Image
        blurRadius={90}
        source={require("../assets/images/bg.png")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: "7%", marginHorizontal: 16, zIndex: 50 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              borderRadius: 30,
              backgroundColor: showSearch ? "#609090" : "transparent",
              height: 60,
              marginTop: 10,
            }}
          >
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search City"
                placeholderTextColor="white"
                style={{
                  paddingLeft: 12,
                  flex: 1,
                  fontSize: 20,
                  color: "white",
                  height: "100%",
                }}
              />
            ) : null}

            <TouchableOpacity
              onPress={() => {
                toggleSearch(!showSearch);
                setLocations([]);
              }}
              style={{
                backgroundColor: "lightgray",
              }}
              className={`${!showSearch} ? rounded-full   p-3 `}
            >
              <MagnifyingGlassCircleIcon size={38} color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute w-full bg-gray-300 mt-16 rounded-3xl">
              {locations.map((loc, index) => {
                let showBorder = index + 1 != locations.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : null;
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={`flex-row items-center border-0 p-3 px-4 m-1 ${borderClass}`}
                  >
                    <MapPinIcon size={20} color="gray" />
                    <Text className="text-black text-lg ml-2">
                      {loc.name}, {loc.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* Showing forecast section */}

        <View className="mx-4 flex justify-around flex-1 mb-2">
          <Text className="text-white text-center text-2xl font-bold">
            {location.name}, &nbsp;
            <Text className="text-lg font-semibold text-gray-300 m-2">
              {location.country}
            </Text>
          </Text>
          <View className="flex-row justify-center ">
            <Image
              className="w-52 h-52"
              source={weatherImages[current.condition.text]}
            />
          </View>
          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              {current.temp_c}&#176; C
            </Text>
            <Text className="text-center text-white text-xl tracking-widest">
              {current.condition.text}
            </Text>
          </View>
          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/wind.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">
                {current.wind_kph}km
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/drop.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">
                {current.humidity}%
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/sun.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">
                06:05 AM
              </Text>
            </View>
          </View>
        </View>
        {/* Forecast section for next days */}
        <View className="mb-2 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2">
            <CalendarDaysIcon size={22} color="white" />
            <Text className="text-white text-base">Daily Forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            {weather.forecast.forecastday.map((item: any, index: any) => {
              let date = new Date(item.date);

              let dayName = date.toLocaleDateString("en-US");
              dayName = dayName.split(",")[0];
              return (
                <View
                  className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                  key={index}
                  style={{ backgroundColor: "gray" }}
                >
                  <Image
                    source={weatherImages[item.day.condition.text]}
                    className="h-11 w-11"
                  />
                  <Text className="text-white">{dayName}</Text>
                  <Text className="text-white text-xl font-semibold">
                    {item.day.avgtemp_c}&#176;C
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
