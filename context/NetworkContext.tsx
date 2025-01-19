import React, { createContext, ReactNode, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

// Create a context to share the network connection status across the app
export const NetworkContext = createContext({ isConnected: true });

const NetworkProvider = ({ children }: { children: ReactNode }) => {

  // State to track if the device is connected to the internet
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {   // Monitor network status using NetInfo
      setIsConnected(state.isConnected ?? false);   // Update the `isConnected` state when the network status changes
    });
    return () => unsubscribe(); // Cleanup the subscription when the component is unmounted
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
