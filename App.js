import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo, Fontisto } from "@expo/vector-icons";

import Home from "./screens/HomeScreen";
import Favorite from "./screens/FavoriteScreen";
import Pokemon from "./screens/PokemonScreen";

import HeaderIcon from "./components/HeaderIcon";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import favorites from "./reducers/favorites";

const store = configureStore({
  reducer: { favorites },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "#F7C50B",
                  tabBarInactiveTintColor: "#266EAE",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                      <Entypo name="home" size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerStyle: { backgroundColor: "white" },
                          headerTitleStyle: { color: "#F7C50B" },
                          headerTitle: () => <HeaderIcon size={16} />,
                        }}
                      >
                        {() => <Home />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Pokemon"
                        options={{
                          headerTitle: () => <HeaderIcon size={"small"} />,
                          headerBackVisible: false,
                        }}
                      >
                        {(props) => <Pokemon {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabFavorite"
                  options={{
                    tabBarLabel: "Favorite",
                    tabBarIcon: ({ color }) => (
                      <Fontisto name="favorite" size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="FavoriteScreen"
                        options={{
                          headerTitle: () => <HeaderIcon size={16} />,
                          headerBackVisible: false,
                        }}
                      >
                        {(props) => <Favorite {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
