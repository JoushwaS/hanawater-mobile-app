import React, { Fragment, useEffect, useState } from "react";
import {
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import { Card, Header, Text } from "../../components";
import { styles } from "./style";
import { getMosqueProducts } from "../../config/api/products";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";
import { Colors } from "../../config/theme";

function Index(props) {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    try {
      setRefreshing(true);
      let languageId = 1;
      const { data: mosqueData } = await getMosqueProducts(languageId);
      setProducts(mosqueData?.data);
      setRefreshing(false);
      // console.log("mosqueDatamosqueData", mosqueData);
    } catch (error) {
      setRefreshing(false);
      showToast({
        type: "error",
        text: error.message,
      });
    }
  };

  return (
    <Fragment>
      <Header text={t("Mosque Products Details")} backButton />
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.mosqueImage}
          source={{ uri: props?.route?.params?.mosqueImage }}
        />
        {refreshing ? (
          <ActivityIndicator
            color={Colors.primary}
            size="large"
          ></ActivityIndicator>
        ) : (
          <FlatList
            data={products}
            ListEmptyComponent={() => (
              <Text size={18}>No Products found !</Text>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getproducts} />
            }
            numColumns={1}
            contentContainerStyle={styles.flatlistStyle}
            showsHorizontalScrollIndicator={false}
            // showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Card
                isFavourite={true}
                index={index}
                item={item}
                showMosque={true}
                mosqueDetails={props?.route?.params?.mosque}
              />
            )}
          ></FlatList>
        )}
      </View>
    </Fragment>
  );
}

export default Index;
