import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NodesScreen from './src/features/nodes/NodesScreen';
import ToolsScreen from './src/features/tools/ToolsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Nodes'>
          <Stack.Screen
            name='Nodes'
            component={NodesScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name='Tools' component={ToolsScreen} />
        </Stack.Navigator>
        <StatusBar hidden={true} />
      </NavigationContainer>
    </Provider>
  );
}
