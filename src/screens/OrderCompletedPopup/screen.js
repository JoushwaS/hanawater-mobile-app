import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  Modal,
  LayoutAnimation,
} from "react-native";
import celebAnim from "./celebAnim.json";
import { Text, Button } from "../../components";

import LottieView from "lottie-react-native";
import styles from "./style";
import metrix from "../../config/metrix";
import { IMAGES } from "../../assets/images";

function Index({ viewRef, modalVisible, setModalVisible, moveToShopping }) {
  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    _startAnim();
  }, []);
  const _startAnim = () => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 0.5,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(_startAnim);
  };

  const closeModal = () => {
    setModalVisible(false);
    moveToShopping();
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      // visible={this.props.Store.userAwardedPoints.length > 0 ? true : false}
      key="points earned"
      style={styles.container}
    >
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Image source={IMAGES.gift2} style={styles.giftImagesmall} />
        <Image source={IMAGES.gift1} style={styles.giftImage} />

        <Text style={styles.orderCompletedText}>Order Completed</Text>
        <Text style={styles.orderCompletedThanksText}>
          Your order will be delivered soon. Thank you for choosing our app!
        </Text>
        <Text style={styles.orderIDText}>Your Order ID is MJ 1201</Text>
        <Button
          onPress={closeModal}
          buttonStyle={styles.buttonStyle}
          variant="outlined"
        >
          Continue Shopping
        </Button>
      </View>
      <LottieView
        resizeMode="cover"
        ref={(animation) => {
          animationRef.current = animation;
        }}
        source={celebAnim}
        progress={progress}
        style={{
          flex: 1,
          width: metrix.HorizontalSize(400),
          backgroundColor: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </Modal>
  );
}

export default Index;
