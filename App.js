import { StatusBar } from "expo-status-bar";
import React, { createContext, useContext, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/app/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NodesScreen from "./src/features/nodes/NodesScreen";
import ToolsScreen from "./src/features/tools/ToolsScreen";
import { AdMobBanner } from "expo-ads-admob";
import { bannerUnitId } from "./src/config";
import useGoogleAds from "./src/features/googleAds/useGoogleAds";
import { AdsContextProvider } from "./src/features/googleAds/adsContext";

const Stack = createStackNavigator();

export default function App() {
  const showAd = useGoogleAds();

  useEffect(() => {
    showAd();
  }, [showAd]);

  return (
    <>
      <Provider store={store}>
        <AdsContextProvider showAd={showAd}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Nodes">
              <Stack.Screen
                name="Nodes"
                component={NodesScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Tools" component={ToolsScreen} />
            </Stack.Navigator>
            <StatusBar hidden={true} />
          </NavigationContainer>
        </AdsContextProvider>
      </Provider>
      <AdMobBanner bannerSize="fullBanner" adUnitID={bannerUnitId} />
    </>
  );
}
