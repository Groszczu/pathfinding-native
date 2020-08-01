import React from 'react';
import { useSelector } from 'react-redux';
import { nodeTypeColor } from '../nodes/NodeTypes';
import { Button } from 'react-native';

const SelectedDrawToolButton = () => {
  const selectedDrawToolType = useSelector(({ tools }) => tools.drawTool);
  return (
    <Button
      selected={true}
      style={{
        backgroundColor: nodeTypeColor[selectedDrawToolType],
        maxWidth: '.75em',
        margin: '.2em .4em',
      }}
    />
  );
};

export default SelectedDrawToolButton;
