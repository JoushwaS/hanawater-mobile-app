import React, { useState, Fragment } from "react";
import { Image, ActivityIndicator, View, TouchableOpacity } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { styles } from "./styles";
import metrix from "../../config/metrix";
import { useSelector } from "react-redux";
import { Colors } from "../../config/theme";

function Index({ data = [], isLoading = false, onPromotionPress = () => {} }) {
  const { lang } = useSelector((state) => state.common);
  const [activeslide, setActiveSlide] = useState(0);
  const getImage = (Languages) => {
    return Languages[0]?.PromotionLanguage?.imagePath;
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        // onPress={() => onPromotionPress(item.id, item.PromotionTypeId)}
        activeOpacity={1}
      >
        <Image
          // source={{ uri: getImage(item.Languages) }}
          source={item.image}
          style={styles.Carouselimg}
        >
          {/* <View style={styles.arrowViewContainer}>
          <View style={styles.arrowContainer}>
            <Image source={ICONS.leftarrow} style={styles.leftarrowicon} />
            <Image source={ICONS.rightarrow} style={styles.leftarrowicon} />
          </View>
        </View> */}
          {/* <View style={styles.categoryTextContainer}>
          <Text style={styles.carouselText}>New Arrival</Text>
          <Text style={styles.carouselsecondText}>2 Pc His & Her Gift Set</Text>
        </View> */}
        </Image>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginVertical: metrix.VerticalSize(30),
      }}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.primary}></ActivityIndicator>
      ) : (
        <Fragment>
          <Carousel
            pagingEnabled={true}
            data={data}
            autoplay={true}
            loop
            windowSize={1}
            autoplayDelay={1000}
            renderItem={_renderItem}
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderWidth={metrix.HorizontalSize()}
            itemWidth={metrix.HorizontalSize()}
            // initialScrollIndex={activeslide}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeslide}
            dotStyle={styles.dot}
            inactiveDotStyle={styles.inactiveDot}
            dotContainerStyle={{
              marginHorizontal: metrix.HorizontalSize(4.57),
            }}
            containerStyle={styles.paginationstyle}
            inactiveDotOpacity={1}
            activeOpacity={1}
            inactiveDotScale={1}
          />
        </Fragment>
      )}
    </View>
  );
}

export default Index;
