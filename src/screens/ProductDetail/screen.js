import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import { Text, Button } from "../../components";
// import { showToast } from "../../utils";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import Navigation from "../../navigation/root";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Quantity from "../../components/Quantity";
import { ICONS } from "../../assets/icons";
import { SCREENS } from "../../config/constants/screens";
import metrix from "../../config/metrix";
import { Fonts, Colors } from "../../config/theme";

function Index(props) {
  const dispatch = useDispatch();
  const TouchableProps = {
    activeOpacity: 0.5,
  };
  const handlePrintMyNamePress = () => {
    Navigation.navigate(SCREENS.PRINT_NAME_SCREEN);
  };

  const [activeslide, setActiveSlide] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [viewname, opneViewName] = useState(false);

  const carouseldata = [
    {
      name: "Women",
      image: IMAGES.productDetail,
      id: 1,
    },
    {
      name: "Men",
      image: IMAGES.productDetail,
      id: 2,
    },
    {
      name: "Office",
      image: IMAGES.productDetail,
      id: 3,
    },
  ];
  const descriptiondata = [
    {
      text: "Men's Gift Set of 3 pcs",
      id: 1,
    },
    {
      text: "Continental Wallet 1286",
      id: 2,
    },
    {
      text: "Bi Fold Wallet Style 1285",
      id: 3,
    },
    {
      text: "Key FOB Style 3254",
      id: 4,
    },
    {
      text: "Packed in Special Gift Box",
      id: 4,
    },
    {
      text: "Wrapped in MJ Signature Gift Paper with Ribbon",
      id: 5,
    },
  ];

  const touchableProps = {
    activeOpacity: 0.5,
  };
  const _renderItem = ({ item, index }) => {
    return (
      <ImageBackground
        source={item.image}
        style={styles.Carouselimg}
        resizeMode="contain"
        imageStyle={styles.imageCon}
      >
        <TouchableOpacity {...TouchableProps} style={styles.circle}>
          <Image source={ICONS.heartfilled} style={styles.heartIcon} />
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  const renderDescriptionItem = ({ item, index }) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.bulletPoint}></View>
        <Text style={styles.features}>{item.text}</Text>
      </View>
    );
  };
  const header = () => {
    return <Text style={styles.featureText}>Features</Text>;
  };

  const renderNameDetails = () => {
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.tab}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                {...TouchableProps}
                onPress={() => setActiveTabIndex(0)}
                style={[
                  styles.selectedTab,
                  {
                    backgroundColor: activeTabIndex == 0 ? "#E0E0FC" : "white",
                    borderRadius:
                      activeTabIndex == 0 ? metrix.HorizontalSize(10) : 0,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabText,
                    {
                      color: activeTabIndex == 0 ? "#6366F1" : "#414141",
                      fontFamily: activeTabIndex == 0 ? Fonts.IS : Fonts.IM,
                    },
                  ]}
                >
                  Continental Wallet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTabIndex(1)}
                {...TouchableProps}
                style={[
                  styles.selectedTab,
                  {
                    backgroundColor: activeTabIndex == 1 ? "#E0E0FC" : "white",
                    borderRadius:
                      activeTabIndex == 1 ? metrix.HorizontalSize(10) : 0,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabText,
                    {
                      color: activeTabIndex == 1 ? "#6366F1" : "#414141",
                      fontFamily: activeTabIndex == 1 ? Fonts.IS : Fonts.IM,
                    },
                  ]}
                >
                  Bi fold wallet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTabIndex(2)}
                {...TouchableProps}
                style={[
                  styles.selectedTab,
                  {
                    backgroundColor: activeTabIndex == 2 ? "#E0E0FC" : "white",
                    borderRadius:
                      activeTabIndex == 2 ? metrix.HorizontalSize(10) : 0,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabText,
                    {
                      color: activeTabIndex == 2 ? "#6366F1" : "#414141",
                      fontFamily: activeTabIndex == 2 ? Fonts.IS : Fonts.IM,
                    },
                  ]}
                >
                  Key Fob
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ width: metrix.HorizontalSize(300) }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Name : Mohsin Ahmed</Text>
            <Text>Color : Light Yellow</Text>
          </View>

          <View style={styles.detailsrowContainer}>
            <Text>Font: Font 2</Text>
            <Text>Placement : Outside</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Button
            onPress={() => Navigation.navigate(SCREENS.CART_DETAILS_SCREEN)}
            buttonStyle={styles.editnamebuttonStyle}
            variant="outlined"
          >
            Edit My Name
          </Button>
          <Button
            // onPress={() => Navigation.navigate(SCREENS.CHECKOUT_SCREEN)}
            buttonStyle={styles.removebuttonStyle}
            variant="outlined"
            textStyle={{ color: Colors.text }}
          >
            Remove
          </Button>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.removeAllText}>Remove All</Text>
        </View>
      </View>
    );
  };

  const handleAddToCart = () => {
    Navigation.navigate(SCREENS.CART_DETAILS_SCREEN);
  };

  const viewDetails = () => {
    return (
      <View style={styles.sortView}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => opneViewName(!viewname)}
            {...touchableProps}
            style={styles.sortViewTouch}
          >
            <Text>View My Name</Text>
            <Image
              resizeMode="contain"
              style={styles.arrowDown}
              source={ICONS.arrowDown}
            />
          </TouchableOpacity>
          {viewname == true ? renderNameDetails() : null}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={{ marginTop: metrix.VerticalSize(20) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.productName}>3 PC Exclusive Gift Set</Text>
              <Text style={styles.productStyle}>Style : MJGS01</Text>
              <Text style={styles.productPrice}>Rs. 6,450</Text>
            </View>
            <Button
              onPress={handleAddToCart}
              buttonStyle={styles.buttonStyle}
              variant="filled"
            >
              Add To Cart
            </Button>
          </View>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            pagingEnabled={true}
            data={carouseldata}
            autoplay={true}
            loop
            autoplayDelay={1000}
            inactiveSlideScale={0.8}
            inactiveSlideOpacity={1}
            activeSlideAlignment="center"
            renderItem={_renderItem}
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderWidth={metrix.HorizontalSize(370)}
            itemWidth={metrix.HorizontalSize(290)}
            initialScrollIndex={activeslide}
          />
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Image source={IMAGES.walletColour} style={styles.wallet} />
        <Quantity />
        <Button
          buttonStyle={styles.printNameButtonStyle}
          onPress={handlePrintMyNamePress}
          variant="outlined"
        >
          Print My Name
        </Button>

        {viewDetails()}

        <Text style={styles.description}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old.{" "}
        </Text>
      </View>
      <View style={styles.containerPadding}>
        <FlatList
          data={descriptiondata}
          numColumns={1}
          style={styles.flatListStyle}
          ListHeaderComponent={header}
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={() => Math.random().toString()}
          renderItem={renderDescriptionItem}
        ></FlatList>
      </View>
    </View>
  );
}

export default Index;
