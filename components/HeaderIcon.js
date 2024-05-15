import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { View, StyleSheet, Platform } from "react-native";

import Constants from "expo-constants";

const HeaderIcon = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[styles.container, Platform.OS === "android" && styles.android]}
    >
      <MaterialCommunityIcons
        name="pokeball"
        size={32}
        color="#E73F34"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  android: {
    marginLeft: "60%",
  },
});

export default HeaderIcon;
