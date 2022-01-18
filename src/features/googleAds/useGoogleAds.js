import { useCallback, useEffect } from "react";
import { AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import {
  interstitialId,
  rewardedAlgorithmId,
  rewardedAnimationSpeedId,
} from "../../config";

const useGoogleAds = () => {
  useEffect(() => {
    (async () => {
      await AdMobInterstitial.setAdUnitID(interstitialId);
    })();
  }, []);

  const showInterstitial = useCallback(async () => {
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
    await AdMobInterstitial.showAdAsync();
  }, []);
  const showRewarded = useCallback(async (type) => {
    if (type === "algorithm") {
      await AdMobRewarded.setAdUnitID(rewardedAlgorithmId);
    } else if (type === "animation_speed") {
      await AdMobRewarded.setAdUnitID(rewardedAnimationSpeedId);
    } else {
      return;
    }
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: false });
    await AdMobRewarded.showAdAsync();
  }, []);

  return {
    showInterstitial,
    showRewarded,
  };
};

export default useGoogleAds;
