import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from "react-native";
import { styles } from "./styles";
import Slider from "./Slider";
import { Header, IconButton, Text } from "../../components";
import Toptabs from "./Toptabs";
import Card from "../../components/Card";
import { IMAGES } from "../../assets/images";
import metrix from "../../config/metrix";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import {
  addPromotionToCart,
  getHomeData,
} from "../../store/actions/promotions";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../config/theme";
import { useTranslation } from "react-i18next";
import { setMosqueData, clearCart } from "../../store/actions";
import { Modal, CustomButton } from "../../components";

function Index(props) {
  const viewRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const sliderData = [
    {
      name: "data1",
      image: IMAGES.carousel1,
      id: 1,
    },
    {
      name: "data2",
      image: IMAGES.carousel2,
      id: 2,
    },
    {
      name: "data3",
      image: IMAGES.carousel3,
      id: 3,
    },
    {
      name: "data4",
      image: IMAGES.carousel4,
      id: 4,
    },
    {
      name: "data5",
      image: IMAGES.carousel5,
      id: 5,
    },
    {
      name: "data6",
      image: IMAGES.carousel6,
      id: 6,
    },
  ];
  const { promotions, common, products, mosque, subscriptions, cart } =
    useSelector((state) => state);

  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    dispatch(getHomeData());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState(1);
  const [warningModal, setWarningModal] = useState(false);
  const [warningModal1, setWarningModal1] = useState(false);

  const handleMosquePress = (item) => {
    if (cart.items.length !== 0) {
      if (cart.items[0].mosque) {
        let SameMosque;
        cart.items.filter((mosque) => (SameMosque = mosque.id === item.id));
        if (SameMosque) {
          handleDifferentMosques(item);
        } else {
          setWarningModal(true);
        }
      } else {
        setWarningModal1(true);
      }
    } else {
      handleDifferentMosques(item);
    }
  };
  const handleDifferentMosques = (item) => {
    try {
      Navigation.navigate(SCREENS.MOSQUE_PRODUCTS, {
        mosque: item,
        mosqueImage: item?.MosqueLanguages[0]?.imagePath,
      });
    } catch (error) {}
  };

  const onPromotionPress = (id, PromotionTypeId) => {
    // dispatch(addPromotionToCart(id, PromotionTypeId));
  };

  // const onMonthPress = (index) => {
  //   setActiveFont(index);
  //   setSubscriptionModal(false);
  // };

  return (
    <View style={styles.container}>
      <Modal
        viewRef={viewRef}
        setModalVisible={setWarningModal}
        modalVisible={warningModal}
      >
        <View style={styles.warningModalView}>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: metrix.VerticalSize(25),
            }}
          >
            You already have Products from different Mosque in your cart, Adding
            new items will remove previous items.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CustomButton
              onPress={() => {
                setWarningModal(false);
              }}
            >
              Cancel
            </CustomButton>

            <CustomButton
              style={{ marginLeft: 10 }}
              onPress={() => {
                setWarningModal(false);
                dispatch(clearCart());
                // handleDifferentMosques(item);
              }}
            >
              OK
            </CustomButton>
          </View>
        </View>
      </Modal>

      <Modal
        viewRef={viewRef}
        setModalVisible={setWarningModal1}
        modalVisible={warningModal1}
      >
        <View style={styles.warningModalView}>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: metrix.VerticalSize(25),
            }}
          >
            You already have Products from all item in your cart, Adding new
            items from Mosque will remove previous items.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CustomButton
              onPress={() => {
                setWarningModal1(false);
              }}
            >
              Cancel
            </CustomButton>

            <CustomButton
              style={{ marginLeft: 10 }}
              onPress={() => {
                setWarningModal1(false);
                dispatch(clearCart());
              }}
            >
              OK
            </CustomButton>
          </View>
        </View>
      </Modal>

      <Header showSearch text={t("home")} />

      <Slider
        onPromotionPress={onPromotionPress}
        // isLoading={common.isLoading}
        data={sliderData}
      />
      <Toptabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 3 ? (
        <View style={{ flex: 1 }}>
          {/* <Text style={styles.text}>{t("Mosque Orders")}</Text> */}
          <FlatList
            data={[...mosque]}
            refreshControl={
              <RefreshControl
                refreshing={common.isLoading}
                onRefresh={() => dispatch(getHomeData())}
              />
            }
            numColumns={1}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: metrix.VerticalSize(50),
            }}
            style={{
              paddingBottom: metrix.VerticalSize(50),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleMosquePress(item)}
                style={styles.mosqueItem}
                activeOpacity={0.5}
              >
                <View style={{ flex: 2 }}>
                  <Text style={styles.mosqueName}>
                    {item?.MosqueLanguages[common?.lang === "en" ? 0 : 1]?.name}
                  </Text>
                  <Text style={styles.mosqueAddress}>{item?.fullAddress}</Text>
                </View>
                <Image
                  resizeMode="contain"
                  style={styles.mosqueImg}
                  source={{
                    uri: item?.MosqueLanguages[common?.lang === "en" ? 0 : 1]
                      ?.imagePath,
                  }}
                ></Image>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={common.isLoading}
              onRefresh={() => dispatch(getHomeData())}
            />
          }
          activeIndex={activeIndex}
          data={activeTab === 1 ? products : activeTab === 2 ? products : []}
          numColumns={1}
          style={{ paddingBottom: metrix.VerticalSize(50) }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: metrix.VerticalSize(50),
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Card item={item} activeTab={activeTab} subItems={subscriptions} />
          )}
        />
      )}
    </View>
  );
}

export default Index;
