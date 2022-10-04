import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Card, Text } from "../../components";
import { useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";

function Index(props) {
  const dispatch = useDispatch();

  const data = [
    {
      name: "Hana Water 1.5L",
      price: "SR 25",
      badgeText: "Multiple of 3",
      image: IMAGES.waterBottle,
    },
    {
      name: "Hana Water 20L",
      price: "SR 120",
      badgeText: "Multiple of 4",
      image: IMAGES.waterGallon,
    },
    {
      name: "Hana Water 1.5L",
      price: "SR 25",
      badgeText: "Multiple of 3",
      image: IMAGES.waterBottle,
    },
    {
      name: "Hana Water 20L",
      price: "SR 120",
      badgeText: "Multiple of 4",
      image: IMAGES.waterGallon,
    },
    {
      name: "Hana Water 1.5L",
      price: "SR 25",
      badgeText: "Multiple of 3",
      image: IMAGES.waterBottle,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(-1);
  const handleCardPress = () => setModalVisible(true);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={1}
        contentContainerStyle={styles.flatlistStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card isFavourite={true} index={index} item={item} />
        )}
      ></FlatList>
    </View>
  );
}

export default Index;
