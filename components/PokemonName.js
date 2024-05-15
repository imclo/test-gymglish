import { Text, StyleSheet } from "react-native";

export default function PokemonName({ name }) {
  return (
    <>
      <Text>{name}</Text>
    </>
  );
}

const styles = StyleSheet.create({
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
