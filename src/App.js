import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import MainNavigation from "./navigation";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "./config/theme";

function App() {
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: Colors.LightGrey,
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor={Colors.Theme_Blue}
          />
          {/* <MainNavigation /> */}
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
