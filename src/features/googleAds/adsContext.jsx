import React, { createContext, useContext } from "react";

const AdsContext = createContext(undefined);

export const AdsContextProvider = ({ children, showAd }) => {
  return <AdsContext.Provider value={showAd}>{children}</AdsContext.Provider>;
};

export const useShowAd = () => {
  const context = useContext(AdsContext);
  if (!context) {
    throw new Error("useShowAd must be used within App");
  }
  return context;
};
