import React from "react";
import NodesGrid from "./NodesGrid";
import OperationsPanel from "../tools/OperationsPanel";
import NavigationButton from "../navigation/NavigationButton";
import ContainerView from "../../components/ContainerView";
import { useShowAd } from "../googleAds/adsContext";

const NodesScreen = () => {
  const { showInterstitial } = useShowAd();

  return (
    <ContainerView>
      <NodesGrid />
      <OperationsPanel onPathfindingFinished={() => showInterstitial()} />
      <NavigationButton text={"Tools"} navigateTo={"Tools"} />
    </ContainerView>
  );
};

export default NodesScreen;
