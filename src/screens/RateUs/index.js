import React, { useState } from "react";
import { View, Image } from "react-native";
import styles from "./style";
import { CustomButton, Header, Text, Circle } from "../../components";
import { IMAGES } from "../../assets/images";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";
import { Rating } from "react-native-ratings";
import { submitOrderRating } from "../../config/api/rating";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";

function Index(props) {
  const [selectedRating, setRating] = useState("Satisfied");
  const [ratingStar, setstarCount] = useState(4);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();

  const ratings = [
    t("Satisfied"),
    t("Late Delivery"),
    t("Incomplete Delivery"),
    t("Damaged Package"),
  ];
  const submitRating = async () => {
    try {
      setLoading(true);
      const { data } = await submitOrderRating({
        orderId: props?.route?.params?.orderId,
        orderRatingOptionId: 1,
        customerComments: selectedRating,
        ratingStar,
      });
      // console.log("data", data);
      setLoading(false);
      showToast({
        type: "success",
        text: t("Rating submitted"),
      });
      setTimeout(() => {
        Navigation.navigate(SCREENS.HOME_SCREEN);
      }, 800);
    } catch (error) {
      setLoading(false);
      showToast({
        type: "error",
        text: error.message || "Failed to submit rating",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header backButton text="" />
      <Image
        resizeMode={"contain"}
        style={styles.image}
        source={IMAGES.rateUs}
      ></Image>
      <Text style={styles.heading}> {t("Rate This Order")}</Text>
      <Text
        style={{ ...styles.subHeading, marginTop: metrix.VerticalSize(47) }}
      >
        {t("Tell us about your ordering experience")}
      </Text>
      <Rating
        // ratingImage={IMAGES.emptyStar}
        type="custom"
        style={styles.rating}
        startingValue={1}
        // reviewColor={Colors.primary}
        // ratingBackgroundColor={Colors.primary}
        onFinishRating={(n) => setstarCount(n)}
        ratingColor={Colors.primary}
        // type="star"
        ratingCount={5}
        imageSize={metrix.VerticalSize(40)}
      />
      {ratings.map((item, index) => (
        <View key={index.toString()} style={styles.textRow}>
          <Circle
            active={selectedRating === item}
            onPress={() => setRating(item)}
          />
          <Text
            style={{
              ...styles.subHeading,
              marginLeft: metrix.HorizontalSize(19),
            }}
          >
            {item}
          </Text>
        </View>
      ))}
      <View style={styles.btnRow}>
        <CustomButton
          style={styles.button}
          onPress={submitRating}
          variant="filled"
          isLoading={isLoading}
        >
          {t("submit")}
        </CustomButton>
      </View>
    </View>
  );
}

export default Index;
