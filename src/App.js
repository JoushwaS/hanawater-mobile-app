import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, Linking } from "react-native";
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
import VersionCheck from "react-native-version-check";
import VersionNumber from "react-native-version-number";
import { Platform } from "react-native";

function App() {
  const [isNetworkConnected, setisNetworkConnected] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    VersionCheck.getLatestVersion({
      packageName:
        Platform.OS === "android" ? "com.hanawater" : "com.apps.hanawater", // Replace with your app's package name
    })
      .then((latestVersion) => {
        console.log("Latest version:>>", latestVersion);
        console.log(VersionNumber.appVersion);

        console.log(VersionNumber.buildVersion);
        console.log(VersionNumber.bundleIdentifier);
      })
      .catch((error) => {
        console.log("Error checking for latest version:", error);
      });
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
