import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { ICONS } from "../../assets/icons";
import { Text } from "..";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../../store/actions";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";

function Index({
  item,
  isCart,
  showMosque,
  showItem,
  mosque,
  setWarningModal2 = () => {},
  setWarningModal3 = () => {},
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items } = useSelector((state) => state.cart);
  const { cart } = useSelector((state) => state);

  const [quantity, setQuantity] = useState(0);

  const touchableProps = {
    activeOpacity: 0.5,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  };

  useEffect(() => {
    // console.log("Card Inside", item);
    if (isCart) {
      setQuantity(item.quantity);
    } else {
      let ind = items.findIndex((val) => {
        return val.id == item.id;
      });
      if (ind > -1) {
        setQuantity(items[ind].quantity);
      } else {
        setQuantity(0);
      }
    }
    // isCart ? setQuantity(item.quantity) : null;
  }, [items]);

  const increaseQuantity = () => {
    if (quantity < 250) {
      console.log("items", items);
      if (items.length > 0 && items[0].subscription) setWarningModal2(true);
      setQuantity(quantity + 1);
      if (showMosque) {
        dispatch(
          addToCart({ ...item, quantity: quantity + 1, showMosque, mosque })
        );
      } else {
        if (items.length > 0 && items[0].mosque) {
          if (isCart) {
            dispatch(addToCart({ ...item, quantity: quantity + 1, showItem }));
          } else {
            setWarningModal3(true);
          }
        } else {
          dispatch(addToCart({ ...item, quantity: quantity + 1, showItem }));
        }
      }
      if (!isCart) {
        showToast({
          type: "success",
          text: t("Product Added to Cart"),
        });
      }
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (showMosque) {
        dispatch(
          addToCart({ ...item, quantity: quantity - 1, showMosque, mosque })
        );
      } else {
        dispatch(addToCart({ ...item, quantity: quantity - 1, showItem }));
      }
    }
  };

  return (
    <View style={styles.QuantityContainer}>
      <TouchableOpacity
        {...touchableProps}
        onPress={decreaseQuantity}
        style={styles.plus}
      >
        <Image
          resizeMode="contain"
          source={ICONS.minus}
          style={styles.plusminusIcon}
        />
      </TouchableOpacity>
      <Text style={styles.productQuantity}>{quantity}</Text>
      <TouchableOpacity
        {...touchableProps}
        onPress={increaseQuantity}
        style={styles.plus}
      >
        <Image
          resizeMode="contain"
          source={ICONS.plusWhite}
          style={styles.plusminusIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Index;
