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
import { RewardsContextProvider } from "./src/features/googleAds/rewardsContext";

const Stack = createStackNavigator();

export default function App() {
  const showAds = useGoogleAds();

  useEffect(() => {
    showAds.showInterstitial();
  }, [showAds.showInterstitial]);

  return (
    <>
      <Provider store={store}>
        <AdsContextProvider showAd={showAds}>
          <RewardsContextProvider>
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
          </RewardsContextProvider>
        </AdsContextProvider>
      </Provider>
      <AdMobBanner bannerSize="fullBanner" adUnitID={bannerUnitId} />
    </>
  );
}
