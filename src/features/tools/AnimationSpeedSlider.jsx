import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnimationFrameTime } from "./toolsSlice";
import { pathfindingState } from "../nodes/nodesSlice";
import Slider from "@react-native-community/slider";
import StyledText from "../../components/StyledText";
import InlineFlex from "../../components/InlineFlex";
import { Button, StyleSheet, Text } from "react-native";
import { useEarnedRewards } from "../googleAds/rewardsContext";
import { useShowAd } from "../googleAds/adsContext";

const AnimationSpeedSlider = () => {
  const { showRewarded } = useShowAd();
  const { animationSpeed: isAnimationSpeedRewardEarned } = useEarnedRewards();
  const animationFrameTime = useSelector(
    ({ tools }) => tools.animationFrameTime
  );
  const [internalAnimationTime, setInternalAnimationTime] =
    useState(animationFrameTime);
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
        disabled={!isReady || !isAnimationSpeedRewardEarned}
        minimumValue={0}
        maximumValue={250}
        step={10}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
      {isAnimationSpeedRewardEarned ? null : (
        <Button
          title="Watch an ad to enable animation speed changes"
          onPress={() => showRewarded("animation_speed")}
        />
      )}
    </InlineFlex>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: "90%",
    maxHeight: 40,
  },
});

export default AnimationSpeedSlider;
