import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAnimationFrameTime } from './toolsSlice';
import { pathfindingState } from '../nodes/nodesSlice';
import Slider from '../../shared/Slider';
import Label from '../../components/Label';
import InlineFlex from '../../components/InlineFlex';
import { useState } from 'react';
import { useEffect } from 'react';

const AnimationSpeedSlider = () => {
  const animationFrameTime = useSelector(
    ({ tools }) => tools.animationFrameTime
  );
  const state = useSelector(({ nodes }) => nodes.pathfinding);
  const dispatch = useDispatch();
  const [internalAnimationTime, setInternalAnimationTime] = useState(
    animationFrameTime
  );

  useEffect(() => {
    setInternalAnimationTime(animationFrameTime);
  }, [animationFrameTime]);

  const handleChange = (e) => {
    setInternalAnimationTime(e.target.value);
  };
  const handleBlur = () => {
    internalAnimationTime !== animationFrameTime &&
      dispatch(setAnimationFrameTime(internalAnimationTime));
  };

  const isReady = state === pathfindingState.ready;
  return (
    <InlineFlex>
      <Label htmlFor={'animation-speed-range'}>
        Animation: {internalAnimationTime}ms
      </Label>
      <Slider
        id={'animation-speed-range'}
        value={internalAnimationTime}
        disabled={!isReady}
        min={0}
        max={250}
        step={10}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </InlineFlex>
  );
};

export default AnimationSpeedSlider;
