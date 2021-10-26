import { Platform } from "react-native";

const testInterstitialId = "ca-app-pub-3940256099942544/1033173712";
const prodInterstitialIdAndroid = "ca-app-pub-3578342616417763/2919975176";
const prodInterstitialIdIos = "ca-app-pub-3578342616417763/6695568654";

const testBannerId = "ca-app-pub-3940256099942544/6300978111";
const prodBannerIdAndroid = "ca-app-pub-3578342616417763/5864050328";
const prodBannerIdIos = "ca-app-pub-3578342616417763~3017205760";

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
