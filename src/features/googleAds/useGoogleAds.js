import { useCallback, useEffect } from "react";
import { AdMobInterstitial } from "expo-ads-admob";
import { interstitialId } from "../../config";

const useGoogleAds = () => {
  useEffect(() => {
    (async () => {
      await AdMobInterstitial.setAdUnitID(interstitialId);
    })();
  }, []);

  return useCallback(async () => {
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
    await AdMobInterstitial.showAdAsync();
  }, []);
};

export default useGoogleAds;
