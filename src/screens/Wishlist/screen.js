import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
} from "react-native";
import { Text } from "../../components";
import { useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";

function Index(props) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    colors: [],
    categories: [],
    sortOrder: "",
    price: 0,
  });
  const viewRef = useRef(null);
  const filterViewRef = useRef(null);

  const data = [
    {
      name: "All day large leather Tote bag ",
      image: IMAGES.product1,
      variations: [
        {
          image: IMAGES.product1,
        },
      ],
      price: "Rs 17,500",
      id: 1,
    },
    {
      name: "Electrum Crossbody Bag ",
      image: IMAGES.product2,
      variations: [
        {
          image: IMAGES.product1,
        },
      ],
      price: "Rs 17,500",
      id: 2,
    },
    {
      name: "Satchel Tote Bag ",
      image: IMAGES.product3,
      variations: [
        {
          image: IMAGES.product1,
        },
      ],
      price: "Rs 17,500",
      id: 3,
    },
    {
      name: "Envelope Bag",
      image: IMAGES.product4,
      variations: [
        {
          image: IMAGES.product1,
        },
      ],
      price: "Rs 17,500",
      id: 3,
    },
    {
      name: "Office",
      image: IMAGES.product5,
      variations: [
        {
          image: IMAGES.product1,
        },
      ],
      price: "Rs 17,500",
      id: 3,
    },
    {
      name: "Office",
      image: IMAGES.product6,
      variations: [
        {
          image: IMAGES.product1,
        },
      ],
      price: "Rs 17,500",
      id: 3,
    },
  ];
  const productVariations = [
    {
      image: IMAGES.bag1,
    },
    {
      image: IMAGES.bag2,
    },
    {
      image: IMAGES.bag1,
    },
    {
      image: IMAGES.bag2,
    },
    {
      image: IMAGES.bag1,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(-1);
  const TouchableProps = {
    activeOpacity: 0.5,
  };

  const handleFilterPress = () => setFilterVisible(true);

  const handleCardPress = () => setModalVisible(true);

  const handleVariationPress = () => {
    setModalVisible(false);
    Navigation.navigate(SCREENS.PRODUCT_DETAIL_SCREEN);
  };

  const clearFilters = () => {
    setActiveFilters({
      colors: [],
      categories: [],
      sortOrder: "",
      price: 0,
    });
  };

  const Header = () => {
    return (
      <Fragment>
        <View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.categoryheaderText}>Wishlist</Text>
            </View>
          </View>
        </View>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <View style={styles.InputView}>
        <FlatList
          data={data}
          numColumns={2}
          ListHeaderComponent={Header()}
          contentContainerStyle={styles.flatlistStyle}
          style={{ marginBottom: metrix.VerticalSize(75) }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={() => Math.random().toString()}
          renderItem={(item, index) => (
            <ProductCard
              onPress={handleCardPress}
              index={activeIndex}
              data={item}
            />
          )}
        ></FlatList>
      </View>
    </Fragment>
  );
}

export default Index;
