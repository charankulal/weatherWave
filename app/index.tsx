import React, { useState } from "react";
import { View, Image, TextInput, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassCircleIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

const Home = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3])
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

            {
              showSearch ? (
                <TextInput
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

              ) : null
            }

            <TouchableOpacity
              onPress={() => { toggleSearch(!showSearch) }}
              style={{
                backgroundColor: "lightgray",
              }}
              className={`${!showSearch} ? rounded-full   p-3 `}
            >
              <MagnifyingGlassCircleIcon size={38} color="white" />
            </TouchableOpacity>
          </View>
          {
            locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 mt-16 rounded-3xl">
                {
                  locations.map((loc, index) => {
                    let showBorder = index + 1 != locations.length
                    let borderClass= showBorder ?'border-b-2 border-b-gray-400': null
                    return (
                      <TouchableOpacity
                        key={index}
                        className={`flex-row items-center border-0 p-3 px-4 m-1 ${borderClass}`}
                      >
                        <MapPinIcon size={20} color="gray" />
                        <Text>London, United Kingdom,</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            ):null
          }
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
