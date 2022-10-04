import React, { useRef } from "react";
import {
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { Text, CustomButton, IconButton, Card } from "../../components";
import { styles } from "./style";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { IMAGES } from "../../assets/images";
import { Colors, Fonts } from "../../config/theme";
import { useTranslation } from "react-i18next";
import { clearCart } from "../../store/actions";
import { useDispatch } from "react-redux";
import { Modal } from "../../components";
import metrix from "../../config/metrix";

function Index({
  noProducts = false,
  cartData = [],
  totalData = {
    totals: [],
    freeDelivery: {},
  },
  handleCheckout = () => {},
  modalVisible,
  setModalVisible,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const viewRef = useRef(null);

  const touchableProps = {
    activeOpacity: 0.5,
  };
  console.log(modalVisible, "modalVisible");
  return (
    <View style={styles.container}>
      <Modal
        viewRef={viewRef}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        <View style={styles.warningModalView}>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: metrix.VerticalSize(25),
            }}
          >
            Minimum quantity to place order is 4, Please add more items!
          </Text>
          <CustomButton onPress={() => setModalVisible(false)}>Ok</CustomButton>
        </View>
      </Modal>
      {noProducts ? (
        <View>
          <Image
            resizeMode={"contain"}
            style={styles.image}
            source={IMAGES.emptycart}
          ></Image>
          <Text style={styles.subHeading}>{t("empty_cart")}</Text>
          <CustomButton
            style={styles.button}
            type="large"
            onPress={() => {
              Navigation.goBack();
            }}
            variant="filled"
          >
            {t("continue_shopping")}
          </CustomButton>
        </View>
      ) : (
        <>
          <FlatList
            data={cartData}
            contentContainerStyle={{}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={() => Math.random().toString()}
            ListHeaderComponent={() => (
              <TouchableOpacity
                style={styles.clearCart}
                onPress={() => {
                  dispatch(clearCart());
                }}
                activeOpacity={0.5}
              >
                <Text
                  style={{
                    color: Colors.primary,
                  }}
                >
                  Clear Cart
                </Text>
                <Image
                  resizeMode="contain"
                  style={styles.clearIcon}
                  source={IMAGES.closeIcon}
                ></Image>
              </TouchableOpacity>
            )}
            renderItem={({ item, index }) => (
              <Card isCart item={item} index={index} />
            )}
          />
          <View style={styles.totalBox}>
            <View style={styles.totalTextRow}>
              <View style={{ alignItems: "flex-start" }}>
                <Text style={styles.totalText}>
                  {totalData?.totals[0]?.title || ""}
                </Text>
                <Text style={styles.totalText}>{"VAT"}</Text>
                {/* <Text style={styles.totalText}>
                  {totalData?.totals[2]?.title || ""}
                </Text> */}
                <Text style={styles.totalText}>
                  {totalData?.totals[3]?.title || ""}
                </Text>
              </View>
              <View>
                <Text style={styles.totalTextVal}>
                  {totalData?.totals[0]?.format || ""}
                </Text>
                <Text style={styles.totalTextVal}>
                  {totalData?.totals[1]?.format || ""}
                </Text>
                {/* <Text style={styles.totalTextVal}>
                  {totalData?.totals[2]?.format || ""}
                </Text> */}
                <Text style={styles.totalTextVal}>
                  {totalData?.totals[3]?.format || ""}
                </Text>
              </View>
            </View>
            {totalData?.freeDelivery?.isFree ? (
              <Text style={styles.freeText}>{t("delivery_is_free")}</Text>
            ) : (
              <TouchableOpacity
                onPress={() => Navigation.navigate(SCREENS.HOME_SCREEN)}
                {...touchableProps}
              >
                <Text style={styles.freeText}>
                  Want free delivery? Add SR{" "}
                  {totalData?.freeDelivery?.remainingAmount || ""} more
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.modalHeading}>
              {totalData?.totals[4]?.title || ""}
            </Text>
            <Text style={styles.total}>
              {" "}
              {totalData?.totals[4]?.format || ""}
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <CustomButton
              type="large"
              onPress={() => Navigation.goBack()}
              style={styles.buttonStyle}
              variant="filled"
            >
              {t("continue_shopping")}
            </CustomButton>
            <CustomButton
              type="large"
              onPress={handleCheckout}
              style={styles.buttonStyle}
              textStyle={{ color: Colors.primary }}
              variant="outlined"
            >
              {t("checkout")}
            </CustomButton>
          </View>
        </>
      )}
    </View>
  );
}

export default Index;
