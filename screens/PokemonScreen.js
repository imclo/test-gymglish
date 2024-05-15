import {
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/core";

import { Entypo } from "@expo/vector-icons";

import Constants from "expo-constants";

import { useEffect, useState } from "react";
import axios from "axios";

import PokemonName from "../components/PokemonName";

import { useDispatch, useSelector } from "react-redux";
import { addPokemon, removePokemon } from "../reducers/favorites";

export default function Pokemon({ route }) {
  const navigation = useNavigation();
  const { id } = route.params;

  // console.log(route.params);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        // console.log(data);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  const isFavorite = (data) => {
    return favorites.some((item) => item.id === data.id);
  };

  const handleSubmit = (newPokemon) => {
    if (isFavorite(newPokemon)) {
      dispatch(removePokemon(newPokemon.name));
    } else {
      dispatch(addPokemon(newPokemon));
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
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
            <>
              <View style={styles.pokemonPage}>
                <Text style={styles.pokemonTitle}>POKEMON CARD</Text>
                <View style={styles.like}>
                  <TouchableOpacity onPress={() => handleSubmit(data)}>
                    {isFavorite(data) ? (
                      <Entypo name="heart" size={24} color="red" />
                    ) : (
                      <Entypo name="heart-outlined" size={24} color="red" />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.card}>
                  <PokemonName name={data.name} />
                  <Image
                    style={styles.cardPic}
                    source={{
                      uri: data.sprites.front_default,
                    }}
                  />
                </View>

                <Text style={styles.pokemonDescription}>Type</Text>
                <View style={styles.type}>
                  {data.types.map((typesTab, index) => {
                    return <Text key={index}> {typesTab.type.name}</Text>;
                  })}
                </View>
                <Text style={styles.pokemonDescription}>Abilities</Text>
                <View style={styles.type}>
                  {data.abilities.map((abilitiesTab, index) => {
                    return (
                      <Text key={index}> {abilitiesTab.ability.name}</Text>
                    );
                  })}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
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
  },
  scrollView: {
    alignItems: "center",
  },
  loading: {
    justifyContent: "center",
    marginTop: 20,
  },
  pokemonPage: {
    alignItems: "center",
    gap: 15,
    marginTop: 20,
  },
  card: {
    borderWidth: 2,
    padding: 20,
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
  },
  cardPic: {
    height: 100,
    width: 80,
  },
  type: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pokemonTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  pokemonDescription: {
    fontSize: 20,
  },
});
