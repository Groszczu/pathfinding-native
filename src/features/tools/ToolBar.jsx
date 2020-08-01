import React from 'react';
import AnimationSpeedSlider from './AnimationSpeedSlider';
import { useState } from 'react';
import AlgorithmPicker from './AlgorithmPicker';
import SelectedDrawToolButton from './SelectedDrawToolButton';
import DrawToolPicker from './DrawToolPicker';
import InlineFlex from '../../components/InlineFlex';

const ToolBar = () => {
  const [focused, setFocused] = useState(false);

  return (
    <InlineFlex
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {focused ? (
        <>
          <DrawToolPicker />
          <AnimationSpeedSlider />
          <AlgorithmPicker />
        </>
      ) : (
        <SelectedDrawToolButton />
      )}
    </InlineFlex>
  );
};

export default ToolBar;
