import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAnimationFrameTime } from './toolsSlice';
import { pathfindingState } from '../nodes/nodesSlice';
import Slider from '@react-native-community/slider';
import StyledText from '../../components/StyledText';
import InlineFlex from '../../components/InlineFlex';
import { StyleSheet } from 'react-native';

const AnimationSpeedSlider = () => {
  const animationFrameTime = useSelector(
    ({ tools }) => tools.animationFrameTime
  );
  const [internalAnimationTime, setInternalAnimationTime] = useState(
    animationFrameTime
  );
  const state = useSelector(({ nodes }) => nodes.pathfinding);
  const dispatch = useDispatch();

  useEffect(() => {
    setInternalAnimationTime(animationFrameTime);
  }, [animationFrameTime]);

  const handleSlidingComplete = (value) => {
    dispatch(setAnimationFrameTime(value));
  };

  const handleValueChange = (value) => {
    setInternalAnimationTime(value);
  };

  const isReady = state === pathfindingState.ready;
  return (
    <InlineFlex>
      <StyledText>Animation: {internalAnimationTime}ms</StyledText>
      <Slider
        style={styles.slider}
        value={animationFrameTime}
        disabled={!isReady}
        minimumValue={0}
        maximumValue={250}
        step={10}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
    </InlineFlex>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '90%',
    maxHeight: 40,
  },
});

export default AnimationSpeedSlider;
