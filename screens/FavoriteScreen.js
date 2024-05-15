import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";

import { Entypo } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/core";

import { useDispatch, useSelector } from "react-redux";
import { removePokemon } from "../reducers/favorites";

export default function Favorite() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);

  const handleDelete = (pokemonToRemove) => {
    dispatch(removePokemon(pokemonToRemove.name));
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
          {favorites.length === 0 ? (
            <Text style={styles.yourFav}>NO FAVORITES YET</Text>
          ) : (
            <Text style={styles.yourFav}>YOUR FAVORITES</Text>
          )}
          <View>
            {favorites.map((poke, index) => (
              <View key={index} style={styles.pokemon}>
                <Text>{poke.name}</Text>
                <Image
                  style={styles.pokemonPic}
                  source={{
                    uri: poke.sprites.front_default,
                  }}
                />
                <TouchableOpacity onPress={() => handleDelete(poke)}>
                  <Entypo name="heart" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
  },
  yourFav: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "bold",
  },
  pokemon: {
    borderRadius: 5,
    padding: 15,
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
