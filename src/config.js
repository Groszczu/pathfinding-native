import { Platform } from "react-native";

const testInterstitialId = "ca-app-pub-3940256099942544/1033173712";
const prodInterstitialIdAndroid = "ca-app-pub-3578342616417763/2919975176";
const prodInterstitialIdIos = "ca-app-pub-3578342616417763/6695568654";

const testBannerId = "ca-app-pub-3940256099942544/6300978111";
const prodBannerIdAndroid = "ca-app-pub-3578342616417763/5864050328";
const prodBannerIdIos = "ca-app-pub-3578342616417763~3017205760";

const testRewardedId = "ca-app-pub-3940256099942544/5224354917";
const prodRewardedAnimationSpeedIdAndroid =
  "ca-app-pub-3578342616417763/1044279930";
const prodRewardedAnimationSpeedIdIos =
  "ca-app-pub-3578342616417763/5147176476";

const prodRewardedAlgorithmIdAndroid = "ca-app-pub-3578342616417763/2381589944";
const prodRewardedAlgorithmIdIos = "";

export const interstitialId = __DEV__
  ? testInterstitialId
  : Platform.OS === "ios"
  ? prodInterstitialIdIos
  : prodInterstitialIdAndroid;
export const bannerUnitId = __DEV__
  ? testBannerId
  : Platform.OS === "ios"
  ? prodBannerIdIos
  : prodBannerIdAndroid;
export const rewardedAnimationSpeedId = __DEV__
  ? testRewardedId
  : Platform.OS === "ios"
  ? prodRewardedAnimationSpeedIdIos
  : prodRewardedAnimationSpeedIdAndroid;
export const rewardedAlgorithmId = __DEV__
  ? testRewardedId
  : Platform.OS === "ios"
  ? prodRewardedAlgorithmIdIos
  : prodRewardedAlgorithmIdAndroid;
