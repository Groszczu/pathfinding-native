import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import NodesGrid from './src/features/nodes/NodesGrid';
import { Provider } from 'react-redux';
import store from './src/app/store';
import ToolBar from './src/features/tools/ToolBar';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NodesGrid />
        <ToolBar />
        <StatusBar style='auto' />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
