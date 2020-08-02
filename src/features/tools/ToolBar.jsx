import React from 'react';
import AnimationSpeedSlider from './AnimationSpeedSlider';
import AlgorithmPicker from './AlgorithmPicker';
import DrawToolPicker from './DrawToolPicker';
import styled from 'styled-components/native';

const AbsoluteView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const ToolBar = () => {
  return (
    <AbsoluteView>
      <DrawToolPicker />
      <AnimationSpeedSlider />
      <AlgorithmPicker />
    </AbsoluteView>
  );
};

export default ToolBar;
