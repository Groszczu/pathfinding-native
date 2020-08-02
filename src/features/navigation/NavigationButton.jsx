import React from 'react';
import SelectedDrawToolButton from '../tools/SelectedDrawToolButton';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const NavigationButton = ({ text, navigateTo }) => {
  const navigation = useNavigation();
  return (
    <SelectedDrawToolButton
      style={styles.button}
      text={text}
      onPress={() => navigation.navigate(navigateTo)}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    zIndex: 100,
  },
});

export default NavigationButton;
