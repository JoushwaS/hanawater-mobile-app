import React from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import { IMAGES } from "../../assets/images";
import { Text } from "../../components";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";
import { styles } from "./styles";

export default function TopRow({ activeTab = 1, setActiveTab = () => {} }) {
  const { t } = useTranslation();

  const renderActiveTabText = (tab) => {
    if (activeTab === tab)
      return {
        color: Colors.White,
      };
  };

  return (
    <View style={styles.topRow}>
      <TouchableOpacity
        onPress={() => setActiveTab(1)}
        style={styles.rowButton}
        activeOpacity={0.5}
      >
        {activeTab === 1 ? (
          <ImageBackground
            style={{ ...styles.tab, width: metrix.HorizontalSize(111) }}
            source={IMAGES.tabBg}
            resizeMode="stretch"
          >
            <Text style={{ ...styles.tabText, ...renderActiveTabText(1) }}>
              {t("All Items")}
            </Text>
          </ImageBackground>
        ) : (
          <Text style={styles.tabText}>{t("All Items")}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveTab(2)}
        style={styles.rowButton}
        activeOpacity={0.5}
      >
        {activeTab === 2 ? (
          <ImageBackground
            style={{ ...styles.tab, width: metrix.HorizontalSize(150) }}
            source={IMAGES.tabBg}
            resizeMode="stretch"
          >
            <Text style={{ ...styles.tabText, ...renderActiveTabText(2) }}>
              {t("Subscription Items")}
            </Text>
          </ImageBackground>
        ) : (
          <Text style={styles.tabText}>{t("Subscription Items")}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveTab(3)}
        style={styles.rowButton}
        activeOpacity={0.5}
      >
        {activeTab === 3 ? (
          <ImageBackground
            style={{ ...styles.tab, width: metrix.HorizontalSize(150) }}
            source={IMAGES.tabBg}
            resizeMode="stretch"
          >
            <Text style={{ ...styles.tabText, ...renderActiveTabText(3) }}>
              {t("Mosque Orders")}
            </Text>
          </ImageBackground>
        ) : (
          <Text style={styles.tabText}>{t("Mosque Orders")}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
