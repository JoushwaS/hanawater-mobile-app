import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  View,
  Modal,
} from "react-native";
import { Text } from "../../components";
import { showToast } from "../../utils";
import { useDispatch } from "react-redux";
import CategoryCard from "../../components/CategoryCard";
import { opneModal } from "../../store/actions";
import { useSelector } from "react-redux";

import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";

function Index(props) {
  const data = [
    {
      name: "Women",
      image: IMAGES.cat1,
      id: 1,
    },
    {
      name: "Men",
      image: IMAGES.cat2,
      id: 2,
    },
    {
      name: "Office",
      image: IMAGES.cat3,
      id: 3,
    },
    {
      name: "Office",
      image: IMAGES.cat3,
      id: 3,
    },
    {
      name: "Office",
      image: IMAGES.cat3,
      id: 3,
    },
    {
      name: "Office",
      image: IMAGES.cat3,
      id: 3,
    },
  ];
  const dispatch = useDispatch();

  const [modalVisible, setModalVisble] = useState(true);
  const [headerText, setheaderText] = useState("");

  const renderItem = (item) => {
    return (
      <CategoryCard
        data={item}
        onPress={() => {
          Navigation.navigate(SCREENS.PRODUCT_LISTING_SCREEN, {
            categoryName: item?.item?.name,
          });
        }}
        viewConStyle={styles.viewCon}
        imageStyle={styles.Catimg}
      />
    );
  };

  const getHeaderTitle = () => {
    if (props?.route?.params?.categoryName) {
      return props?.route?.params?.categoryName;
    } else {
      return headerText;
    }
  };

  const header = () => {
    console.log("proppsss navigationn", props.route);
    return <Text style={styles.categoryheaderText}>{getHeaderTitle()}</Text>;
  };

  return (
    <Fragment>
      <View style={styles.modalContainer}>
        <FlatList
          data={data}
          numColumns={2}
          style={styles.flatListStyle}
          contentContainerStyle={{ alignItems: "center" }}
          ListHeaderComponent={header()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={() => Math.random().toString()}
          renderItem={renderItem}
        ></FlatList>
      </View>
    </Fragment>
  );
}

export default Index;
