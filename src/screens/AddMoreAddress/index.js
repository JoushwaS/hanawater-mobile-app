import React, { useState, Fragment, useCallback } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import { Text } from "../../components";
import Navigator from "../../navigation/root";
// import CustomInput from "../../components/CustomInput";
import { styles } from "./style";
import { ICONS } from "../../assets/icons";
import { Header } from "../../components";
import { SCREENS } from "../../config/constants/screens";
import { deleteAddress, getAddressList } from "../../config/api/auth";
import metrix from "../../config/metrix";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";

function Index(props) {
  const [activeindex, setActiveIndex] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [addressList, setaddressList] = useState([]);
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const touchableProps = {
    activeOpacity: 0.5,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  };

  const handleAddNewAddress = (item = null) => {
    Navigator.navigate(SCREENS.MAP_ADDRESS, { editAddress: item });
  };

  const getData = async () => {
    try {
      setLoading(true);
      const { data: address } = await getAddressList();
      // console.log("cartData,cartDatacartData", address);
      setaddressList(address?.data);
      setLoading(false);
    } catch (error) {
      showToast({
        text: error?.response?.data?.message || error.message,
        type: "error",
      });
      setLoading(false);
    }
  };

  const onDeleteAddress = async (item) => {
    // console.log("item", item);
    try {
      setLoading(true);
      const { data } = await deleteAddress(item.id);
      // console.log("delete data", data);
      getData();
      showToast({
        text: t("Address Deleted Successfully"),
        type: "success",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast({
        text: error?.response?.data?.message || error.message,
        type: "error",
      });
    }
  };

  return (
    <Fragment>
      <Header backButton text={t("addresses")} />
      <View style={styles.container}>
        <FlatList
          data={addressList}
          numColumns={1}
          refreshing={Loading}
          ListEmptyComponent={() => <Text size={18}>No Address found !</Text>}
          contentContainerStyle={{
            paddingVertical: metrix.VerticalSize(15),
          }}
          refreshControl={
            <RefreshControl refreshing={Loading} onRefresh={() => getData()} />
          }
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={{
                alignItems: "center",
                marginTop: metrix.VerticalSize(10),
              }}
              onPress={handleAddNewAddress}
              {...touchableProps}
            >
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={ICONS.plus}
              ></Image>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => Math.random().toString()}
          renderItem={({ item, index }) => (
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => setActiveIndex(index)}
              >
                {activeindex == index && (
                  <View style={styles.innerCircle}></View>
                )}
              </TouchableOpacity>
              <View style={styles.shippingBox}>
                <Text style={styles.locationtextStyle}>
                  {item?.fullAddress}
                </Text>
                <TouchableOpacity
                  onPress={() => onDeleteAddress(item)}
                  {...touchableProps}
                  style={styles.delete}
                >
                  <Image
                    resizeMode="contain"
                    style={styles.deleteIcon}
                    source={ICONS.delete}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </Fragment>
  );
}

export default Index;
