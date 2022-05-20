import React, { useRef, useState, Fragment } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  TextInput,
  FlatList,
} from "react-native";
import { Text, Button, CustomInput, CustomInputCoupon } from "../../components";
// import { showToast } from "../../utils";
// import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import { CartItem, IconButton } from "../../components";
import Navigation from "../../navigation/root";
import Modal from "../../screens/ProductsListing/modal";
import { SCREENS } from "../../config/constants/screens";

function Index(props) {
  // const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [activeindex, setActiveIndex] = useState(-1);
  const [selectedPromo, setSelectedPromo] = useState("");
  const viewRef = useRef(null);

  const promoOptions = [
    "EID15 - 15% Off",
    "MJ22 - 22% Off",
    "14AUG - PKR 200 Off",
    "MJ77 - Free Delivery",
  ];
  const cartDetails = [
    {
      image: IMAGES.product1,
      quantity: 0,
      name: "Coin Pocket Bi-Fold Wallet",
      price: "Rs. 5,600",
      variation: "Color: Tan & Black",
    },
    {
      image: IMAGES.product1,
      quantity: 0,
      name: "Coin Pocket Bi-Fold Wallet",
      price: "Rs. 5,600",
      variation: "Color: Tan & Black",
    },
  ];

  const touchableProps = {
    activeOpacity: 0.5,
  };

  const handleRemovePromo = () => {
    setSelectedPromo("");
    setActiveIndex(-1);
  };

  const footer = () => {
    return (
      <View>
        {selectedPromo ? (
          <View style={styles.selectedPromo}>
            <Text>Selected Promo Added</Text>
            <View style={styles.cancelPromo}>
              <Text style={styles.selectedPromoText}>
                {selectedPromo.split("-")[0]}
              </Text>
              <IconButton
                style={styles.closeIcon}
                icon={IMAGES.closeIcon}
                onPress={handleRemovePromo}
              />
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            {...touchableProps}
          >
            <Text style={styles.enterPromo}>Select Promo Code</Text>
          </TouchableOpacity>
        )}

        {/* <CustomInputCoupon placeholder="MJJ2" /> */}
        <View style={styles.cartSummaryView}>
          <View style={styles.cartSummaryContainer}>
            <Text>Sub Total</Text>
            <Text>Rs. 37,750</Text>
          </View>
          {selectedPromo ? (
            <Fragment>
              <View style={styles.cartSummaryContainer}>
                <Text>Discount</Text>
                <Text>-Rs. 7,750</Text>
              </View>
              <View style={styles.cartSummaryContainer}>
                <Text>Total</Text>
                <Text>Rs. 30,000</Text>
              </View>
            </Fragment>
          ) : null}
        </View>
        <View style={styles.bottomRow}>
          <Button
            onPress={() => Navigation.goBack()}
            buttonStyle={styles.buttonStyle}
            variant="outlined"
          >
            Continue Shopping
          </Button>
          <Button
            onPress={() => Navigation.navigate(SCREENS.CHECKOUT_SCREEN)}
            buttonStyle={styles.buttonStyle}
            variant="filled"
          >
            Checkout
          </Button>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <CartItem data={item} index={index} onPress={handlePrintMyNamePress} />
    );
  };

  const handlePrintMyNamePress = () => {
    Navigation.navigate(SCREENS.PRINT_NAME_SCREEN);
  };

  const handlePromoCodePress = (item, i) => {
    setSelectedPromo(item);
    setActiveIndex(i);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ContainerPadding}>
        <Text style={styles.headingText}>View Cart</Text>
        <Modal
          viewRef={viewRef}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <View style={styles.variationView}>
            <View style={styles.headerRow}>
              <Text style={styles.modalHeading}>Select Promocode</Text>
              <IconButton
                style={styles.closeIcon}
                icon={IMAGES.closeIcon}
                onPress={() => setModalVisible(false)}
              />
            </View>
            {promoOptions.map((item, i) => (
              <TouchableOpacity
                {...touchableProps}
                onPress={() => handlePromoCodePress(item, i)}
                key={i.toString()}
                style={styles.rowContainer}
              >
                <View style={styles.circle}>
                  {activeindex === i && (
                    <View style={styles.innerCircle}></View>
                  )}
                </View>
                <Text key={i.toString()} style={styles.modalText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
        <FlatList
          data={cartDetails}
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={footer()}
          keyExtractor={() => Math.random().toString()}
          renderItem={renderItem}
        ></FlatList>
      </View>
    </View>
  );
}

export default Index;
