import React from "react";
import algorithmId from "../../util/algorithms/algorithmId";
import { useDispatch, useSelector } from "react-redux";
import { setPathfindingAlgorithm } from "./toolsSlice";
import InlineFlex from "../../components/InlineFlex";
import StyledText from "../../components/StyledText";
import { useEarnedRewards } from "../googleAds/rewardsContext";
import { Picker } from "@react-native-picker/picker";
import { Button, StyleSheet } from "react-native";
import { useShowAd } from "../googleAds/adsContext";

const AlgorithmPicker = () => {
  const { algorithm: isAlgorithmChangeRewardEarned } = useEarnedRewards();
  const { showRewarded } = useShowAd();
  const selectedAlgorithm = useSelector(
    ({ tools }) => tools.pathfindingAlgorithm
  );
  const dispatch = useDispatch();
  const handleChange = (value) => {
    dispatch(setPathfindingAlgorithm(value));
  };
  return (
    <InlineFlex>
      <StyledText>Algorithm</StyledText>
      <Picker
        style={styles.picker}
        onValueChange={handleChange}
        selectedValue={selectedAlgorithm}
        enabled={isAlgorithmChangeRewardEarned}
      >
        {Object.entries(algorithmId).map(([key, value]) => (
          <Picker.Item key={key} label={value} value={value} />
        ))}
      </Picker>
      {isAlgorithmChangeRewardEarned ? null : (
        <Button
          title="Watch an ad to enable algorithm changes"
          onPress={() => showRewarded("algorithm")}
        />
      )}
    </InlineFlex>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: "90%",
    borderWidth: 3,
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 4,
  },
});

export default AlgorithmPicker;
