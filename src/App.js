import "react-native-gesture-handler";
import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  StatusBar,
  Linking,
  View,
  Text,
} from "react-native";
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
import { Modal, CustomButton } from "./components";
import metrix from "./config/metrix";
function App() {
  const [isNetworkConnected, setisNetworkConnected] = useState(null);
  const [showUpdateAvailable, setshowUpdateAvailable] = useState(false);
  const [bundleIdentifier, setbundleIdentifier] = useState("");
  const { t } = useTranslation();
  const showUpdateModalRef = useRef(null);

  const handleRedirectToStore = () => {
    if (Platform.OS === "android") {
      const appUrl = `market://details?id=${bundleIdentifier}`;

      Linking.openURL(appUrl).catch((error) => {
        console.log("Error opening app URL:", error);
      });
      setshowUpdateAvailable(false);
    } else {
      const appUrl = `https://apps.apple.com/app/${bundleIdentifier}`;
      Linking.openURL(appUrl).catch((error) => {
        console.log("Error opening app URL:", error);
      });
      setshowUpdateAvailable(false);
    }
  };
  useEffect(() => {
    VersionCheck.getLatestVersion({
      packageName: VersionNumber.bundleIdentifier, // Replace with your app's package name
    })
      .then((latestVersion) => {
        console.log("Latest version:>>", latestVersion);
        console.log(VersionNumber.appVersion);
        if (VersionNumber.appVersion != latestVersion) {
          setshowUpdateAvailable(true);
        }
        console.log(VersionNumber.buildVersion);
        console.log(VersionNumber.bundleIdentifier);
        setbundleIdentifier(VersionNumber.bundleIdentifier);
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
          <Modal
            viewRef={showUpdateModalRef}
            setModalVisible={setshowUpdateAvailable}
            modalVisible={showUpdateAvailable}
          >
            <View
              style={{
                width: metrix.HorizontalSize(370),
                height: metrix.VerticalSize(300),
                backgroundColor: Colors.White,
                borderRadius: metrix.VerticalSize(10),
                paddingVertical: metrix.VerticalSize(25),
                paddingHorizontal: metrix.HorizontalSize(35),
                shadowColor: "#000",
                shadowOpacity: 0.5,
                shadowRadius: 15,
                justifyContent: "center",

                elevation: 5,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: metrix.CustomFontSize(24 + 2),
                    textAlign: "center",
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                    marginBottom: metrix.VerticalSize(10),
                  }}
                >
                  {" "}
                  {t("new_version_available")}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  {t("new_version_available_text")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // alignItems: "center",
                  width: metrix.HorizontalSize(270),
                }}
              >
                <CustomButton
                  onPress={() => {
                    setshowUpdateAvailable(false);
                  }}
                  style={{
                    marginTop: metrix.VerticalSize(25),
                    width: metrix.HorizontalSize(70),
                  }}
                  textStyle={{ color: Colors.primary }}
                  variant="outlined"
                >
                  {t("later")}
                </CustomButton>
                <CustomButton
                  onPress={() => {
                    handleRedirectToStore();
                  }}
                  style={{
                    marginTop: metrix.VerticalSize(25),
                    width: metrix.HorizontalSize(70),
                  }}
                  variant="filled"
                >
                  {t("update_now")}
                </CustomButton>
              </View>
            </View>
          </Modal>
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
