import { AdMobRewarded } from "expo-ads-admob";
import React, { createContext, useContext } from "react";

const RewardsContext = createContext(undefined);

export const RewardsContextProvider = ({ children }) => {
  const [earnedRewards, setEarnedRewards] = React.useState({
    animationSpeed: false,
    algorithm: false,
  });

  React.useEffect(() => {
    const handleRewardedVideoUserDidEarnReward = (e) => {
      if (e.type === "animation_speed") {
        setEarnedRewards((prev) => ({ ...prev, animationSpeed: true }));
      } else if (e.type === "algorithm") {
        setEarnedRewards((prev) => ({ ...prev, algorithm: true }));
      }
    };
    AdMobRewarded.addEventListener(
      "rewardedVideoUserDidEarnReward",
      handleRewardedVideoUserDidEarnReward
    );
    return () =>
      AdMobRewarded.removeEventListener(
        "rewardedVideoUserDidEarnReward",
        handleRewardedVideoUserDidEarnReward
      );
  }, []);

  return (
    <RewardsContext.Provider value={earnedRewards}>
      {children}
    </RewardsContext.Provider>
  );
};

export const useEarnedRewards = () => {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error("useIsRewardedEarned must be used within App");
  }
  return context;
};
