import React from "react";
import { View, Image } from "react-native";
import styles from "./style";
import { CustomButton, Header, Text } from "../../components";
import { IMAGES } from "../../assets/images";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { Colors } from "../../config/theme";
import { useTranslation } from "react-i18next";

function Index(props) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Header back text="" />
      <Image
        resizeMode={"contain"}
        style={styles.image}
        source={IMAGES.thankYou}
      ></Image>
      <Text style={styles.heading}>{t("thankyou")}</Text>
      <Text style={styles.subHeading}>{t("here_are_your_order_details")}</Text>
      <View style={styles.row}>
        <CustomButton
          style={styles.button}
          type="large"
          onPress={() =>
            Navigation.navigate(SCREENS.ORDER_STATUS, {
              orderId: props?.route?.params?.orderId,
              OrderStatusId: 1,
            })
          }
          variant="outlined"
          textStyle={{ color: Colors.primary }}
        >
          {t("track_your_order")}
        </CustomButton>
        <CustomButton
          style={styles.button}
          type="large"
          onPress={() => Navigation.navigate(SCREENS.HOME_NAVIGATOR)}
          variant="filled"
        >
          {t("continue_shopping")}
        </CustomButton>
      </View>
    </View>
  );
}

export default Index;
