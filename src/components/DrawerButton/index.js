import React, { useState } from "react";
import { Image, TouchableOpacity, View, I18nManager } from "react-native";
import styles from "./styles";
import { Text } from "..";
import Navigator from "../../navigation/root";
import { t } from "i18next";

const touchableProps = {
  activeOpacity: 0.5,
};

const DrawerButton = ({ item, onPress }) => {
  const [help, openHelp] = useState(false);
  const [categories, opencategories] = useState(false);
  const [about, showAbout] = useState(false);
  const [account, showAccount] = useState(false);

  return (
    <TouchableOpacity
      {...touchableProps}
      onPress={() => onPress(item)}
      style={[styles.container]}
    >
      <View style={styles.drawerItemheight}>
        <View style={styles.rowContainer}>
          <Image
            source={item?.icon}
            resizeMode="contain"
            style={[
              styles.iconImg,
              {
                transform: I18nManager.isRTL
                  ? [
                      {
                        rotate:
                          item?.name == t("Logout") ||
                          item?.name == t("sign_in_register")
                            ? "180deg"
                            : "0deg",
                      },
                    ]
                  : [{ rotate: "0deg" }],
              },
            ]}
          />
          <Text style={styles.drawerText}>{item?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DrawerButton;
