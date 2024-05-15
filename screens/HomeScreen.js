import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/core";

import { useEffect, useState } from "react";
import axios from "axios";

import Constants from "expo-constants";

import PokemonName from "../components/PokemonName";

export default function Home() {
  const navigation = useNavigation();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        // console.log(data.results);
        setData(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        style={{
          marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#E73F34" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View>
              {data.map((pokemon, index) => {
                const url = pokemon.url.split("/")[6];
                // console.log(pokemon.url.split("/")[6]);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("Pokemon", {
                        id: pokemon.name,
                      });
                    }}
                  >
                    <View style={styles.pokemon}>
                      <PokemonName name={pokemon.name} />
                      <Image
                        style={styles.pokemonPic}
                        source={{
                          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    backgroundColor: "white",
    marginBottom: 10,
  },
  scrollView: {
    alignItems: "center",
  },
  loading: {
    justifyContent: "center",
    marginTop: 20,
  },
  pokemon: {
    borderRadius: 5,
    padding: 30,
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginTop: 10,
  },
  pokemonPic: {
    height: 100,
    width: 100,
  },
});
