import React, { Fragment, useCallback, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import Screen from "./screen";
import { Header } from "../../components";
import { getCartTotal } from "../../config/api/cart";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../utils";
import { styles } from "./style";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../config/theme";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { clearCart } from "../../store/actions";
import { useTranslation } from "react-i18next";
import { Modal } from "../../components/Modal";

function Index(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [noProducts, setNoProducts] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalData, setTotal] = useState({
    freeDelivery: {
      isFree: false,
      percentage: "0",
      remainingAmount: "0",
      requiredAmount: 0,
    },
    totals: [],
  });
  const { items } = useSelector((state) => state.cart);

  const { isAuthenticated } = useSelector((state) => state.auth);

  useFocusEffect(
    useCallback(() => {
      if (items.length > 0) {
        setNoProducts(false);
        getData();
      } else {
        setNoProducts(true);
      }
    }, [items])
  );

  const getData = async () => {
    // dispatch(clearCart());
    try {
      setLoading(true);
      const { data: cartData } = await getCartTotal({
        items: items.map((i) => {
          if (i?.subscription) {
            return {
              itemId: i.productId || i.id || i.itemId,
              quantity: i.quantity,
              subscription: i.subscription,
            };
          } else {
            return {
              itemId: i.productId || i.id || i.itemId,
              quantity: i.quantity,
            };
          }
        }),
      });

      console.log("cartData here>>", cartData.data);
      const { freeDelivery, totals } = cartData?.data;
      // console.log("cartData?.data", cartData?.data.items);
      const mappedData = cartData?.data.items.map((item, i) => {
        const found = items.findIndex((data) => data.id === item.productId);
        if (found === -1) return {};
        else
          return {
            ...item,
            subscription: items[found].subscription,
          };
      });
      // console.log("mappedData==>", mappedData);
      setCartItems(cartData?.data.items);
      setTotal({
        freeDelivery,
        totals,
      });
      setLoading(false);
    } catch (error) {
      console.log("error here>>", error);
      showToast({
        text: error?.response?.data?.message || error.message,
        type: "error",
      });
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    let totalQ = 0;
    let subscription = undefined;
    items.map(
      (item) => (
        (totalQ = totalQ + item.quantity), (subscription = item.subscription)
      )
    );
    if (isAuthenticated) {
      if (totalQ < 4 && subscription === undefined) {
        setModalVisible(true);
      } else {
        Navigation.navigate(SCREENS.CHECKOUT_SCREEN);
      }
    } else {
      if (totalQ < 4 && subscription === undefined) {
        setModalVisible(true);
      } else {
        Navigation.navigate(SCREENS.AUTH_STACK, {
          cart: true,
        });
      }
    }
  };

  return (
    <Fragment>
      <Header text={t("cart")} showSearch />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            color={Colors.primary}
            size="large"
          ></ActivityIndicator>
        </View>
      ) : (
        <Screen
          noProducts={noProducts}
          cartData={cartItems}
          totalData={totalData}
          handleCheckout={handleCheckout}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          {...props}
        />
      )}
    </Fragment>
  );
}

export default Index;
