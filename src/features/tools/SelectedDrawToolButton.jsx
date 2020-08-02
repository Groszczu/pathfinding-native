import React from 'react';
import { useSelector } from 'react-redux';
import { nodeTypeColor } from '../nodes/NodeTypes';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';

const SelectedDrawToolButton = ({ onPress, style, text }) => {
  const selectedDrawToolType = useSelector(({ tools }) => tools.drawTool);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.bottomButton,
          style,
          {
            backgroundColor: nodeTypeColor[selectedDrawToolType],
          },
        ]}
      >
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bottomButton: {
    width: '100%',
    height: '8%',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});

export default SelectedDrawToolButton;
