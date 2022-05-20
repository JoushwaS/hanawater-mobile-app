import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
} from "react-native";
import { Text } from "../../components";
import { showToast } from "../../utils";
import { useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard";
import IconButton from "../../components/IconButton";
import { IMAGES } from "../../assets/images";
import { ICONS } from "../../assets/icons";
import CustomInput from "../../components/CustomInput";
import { styles } from "./style";
import metrix from "../../config/metrix";
import Modal from "./modal";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import FilterModal from "../../components/FilterModal";

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
        <View style={styles.filterRow}>
          <TouchableOpacity
            onPress={handleFilterPress}
            {...TouchableProps}
            style={styles.rowCon}
          >
            <Image source={ICONS.filter} style={styles.iconStyle} />
            <Text>Filters</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fiterAppliedRow}>
          {activeFilters.categories.length > 0 && (
            <View style={styles.filterBox}>
              <Text style={styles.filterBoxText} numberOfLines={1}>
                Categories : {activeFilters.categories.toString()}
              </Text>
              {/* <IconButton
                style={styles.closeIcon}
                icon={IMAGES.closeIcon}
                onPress={() => {}}
              /> */}
            </View>
          )}
          {activeFilters.price > 0 && (
            <View style={styles.filterBox}>
              <Text style={styles.filterBoxText}>
                Price Range : 0 - {activeFilters.price}
              </Text>
              {/* <IconButton
                style={styles.closeIcon}
                icon={IMAGES.closeIcon}
                onPress={() => {}}
              /> */}
            </View>
          )}
        </View>
        <View style={styles.fiterAppliedRow}>
          {activeFilters.colors.length > 0 && (
            <View style={styles.filterBox}>
              <Text>Colors : {activeFilters.colors.toString()}</Text>
            </View>
          )}

          {activeFilters.colors.length > 0 ||
          activeFilters.categories.length > 0 ||
          activeFilters.price > 0 ||
          activeFilters.sortOrder ? (
            <TouchableOpacity onPress={clearFilters} {...TouchableProps}>
              <Text style={styles.clearAll}>Clear All</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <View style={styles.InputView}>
        <FilterModal
          viewRef={filterViewRef}
          modalVisible={filterVisible}
          setModalVisible={setFilterVisible}
          setActiveFilters={setActiveFilters}
          activeFilters={activeFilters}
        />
        <Modal
          viewRef={viewRef}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <View style={styles.variationView}>
            <View style={styles.headerRow}>
              <Text>Product Variations</Text>
              <IconButton
                style={styles.closeIcon}
                icon={IMAGES.closeIcon}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <FlatList
              data={productVariations}
              numColumns={3}
              contentContainerStyle={{}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={() => Math.random().toString()}
              renderItem={(item, index) => (
                <TouchableOpacity
                  style={styles.variationCard}
                  {...TouchableProps}
                  onPress={handleVariationPress}
                >
                  <Image
                    style={styles.variationImg}
                    resizeMode="contain"
                    source={require("../../assets/images/Bag1.png")}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        <CustomInput icon={ICONS.search} placeholder="Search Product Here" />
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
