import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import MainNavigation from "./navigation";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { NoInternet } from "./screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "./config/theme";
import SplashScreen from "react-native-splash-screen";
import "./translations";
import NetInfo from "@react-native-community/netinfo";
import { showToast } from "./utils";
import { useTranslation } from "react-i18next";

function App() {
  const [isNetworkConnected, setisNetworkConnected] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setisNetworkConnected(state.isConnected);
    });
    SplashScreen.hide();
    return () => {
      unsubscribe();
    };
  }, []);

  const onRetry = () => {
    NetInfo.fetch()
      .then((state) => {
        setisNetworkConnected(state.isConnected);
        if (!state.isConnected) {
          showToast({
            text: t("Failed To Connect"),
            type: "error",
          });
        }
      })
      .catch((error) => {
        showToast({
          text: error?.message,
          type: "error",
        });
      });
  };

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: Colors.White,
      }}
    >
      <Provider store={store}>
        <PersistGate
          loading={
            <ActivityIndicator
              color={Colors.primary}
              size="large"
            ></ActivityIndicator>
          }
          persistor={persistor}
        >
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor={Colors.White}
          />
          {isNetworkConnected ? (
            <MainNavigation />
          ) : (
            <NoInternet onButtonPress={onRetry} />
          )}
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
