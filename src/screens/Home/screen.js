import React, { Fragment, useMemo, useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { Text } from "../../components";
import Navigation from "../../navigation/root";
import { useDispatch } from "react-redux";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";
import { ICONS } from "../../assets/icons";
import SplashScreen from "react-native-splash-screen";

function Index(props) {
  const dispatch = useDispatch();
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const carouseldata = [
    {
      name: "Women",
      image: IMAGES.carousel1,
      id: 1,
    },
    {
      name: "Men",
      image: IMAGES.carousel1,
      id: 2,
    },
    {
      name: "Office",
      image: IMAGES.carousel1,
      id: 3,
    },
  ];
  const categorydata = [
    {
      name: "Women",
      image: IMAGES.home1,
      id: 1,
    },
    {
      name: "Men",
      image: IMAGES.home2,
      id: 2,
    },
    {
      name: "Office",
      image: IMAGES.home3,
      id: 3,
    },
    {
      name: "Office",
      image: IMAGES.home4,
      id: 3,
    },
    {
      name: "Office",
      image: IMAGES.home5,
      id: 3,
    },
  ];
  const [activeslide, setActiveSlide] = useState(0);

  useEffect(() => {
    // SplashScreen.hide();
  });

  const _renderItem = ({ item, index }) => {
    return (
      <ImageBackground
        source={item.image}
        style={styles.Carouselimg}
        imageStyle={styles.imageCon}
      >
        <View style={styles.arrowViewContainer}>
          <View style={styles.arrowContainer}>
            <Image source={ICONS.leftarrow} style={styles.leftarrowicon} />
            <Image source={ICONS.rightarrow} style={styles.leftarrowicon} />
          </View>
        </View>

        <View style={styles.categoryTextContainer}>
          <Text style={styles.carouselText}>New Arrival</Text>
          <Text style={styles.carouselsecondText}>2 Pc His & Her Gift Set</Text>
        </View>
      </ImageBackground>
    );
  };

  const header = () => {
    return (
      <View style={{ marginTop: metrix.VerticalSize(20) }}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          pagingEnabled={true}
          data={carouseldata}
          autoplay={true}
          loop
          windowSize={1}
          autoplayDelay={1000}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveSlide(index)}
          sliderWidth={metrix.HorizontalSize(428)}
          itemWidth={metrix.HorizontalSize(428)}
          // initialScrollIndex={activeslide}
        />
      </View>
    );
  };

  return useMemo(() => {
    return (
      <ScrollView>
        {header()}
        {/* {_renderCategoryItem()} */}
        <View style={styles.containerpadding}>
          <TouchableOpacity
            {...touchableProps}
            onPress={() =>
              Navigation.navigate("Categories", {
                category: "Women",
              })
            }
          >
            <ImageBackground
              source={IMAGES.home1}
              style={styles.Catimg}
              imageStyle={styles.Catimg}
            >
              <Text style={styles.catText}>Women</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            {...touchableProps}
            onPress={() =>
              Navigation.navigate("Categories", {
                category: "Men",
              })
            }
          >
            <ImageBackground
              source={IMAGES.home2}
              style={styles.Catimg}
              imageStyle={styles.Catimg}
            >
              <Text style={styles.catText}>Men</Text>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.categoryViewStyle}>
            <TouchableOpacity
              {...touchableProps}
              onPress={() =>
                Navigation.navigate("Categories", {
                  category: "Men",
                })
              }
            >
              <ImageBackground
                source={IMAGES.home3}
                style={styles.Catimgrow}
                imageStyle={styles.Catimgrow}
              >
                <Text style={styles.catText}>Men</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              {...touchableProps}
              onPress={() =>
                Navigation.navigate("Categories", {
                  category: "Men",
                })
              }
            >
              <ImageBackground
                source={IMAGES.home4}
                style={styles.Catimgrow}
                imageStyle={styles.Catimgrow}
              >
                <Text style={styles.catText}>Men</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            {...touchableProps}
            onPress={() =>
              Navigation.navigate("Categories", {
                category: "Men",
              })
            }
          >
            <ImageBackground
              source={IMAGES.home5}
              style={styles.Catimg}
              imageStyle={styles.Catimg}
            >
              <Text style={styles.catText}>Men</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <Pagination
          dotsLength={3}
          activeDotIndex={activeslide}
          dotStyle={styles.dot}
          inactiveDotStyle={styles.inactiveDot}
          dotContainerStyle={{
            marginHorizontal: metrix.VerticalSize(3),
          }}
          containerStyle={styles.paginationstyle}
          inactiveDotOpacity={1}
          activeOpacity={1}
          inactiveDotScale={1}
        />
      </ScrollView>
    );
  }, [props]);
}

export default Index;
