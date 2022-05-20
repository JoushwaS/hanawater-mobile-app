import React, { Fragment, useState } from "react";
import { ScrollView, View, Image, Text } from "react-native";
import { styles } from "./styles";
import { Header, StatusButton } from "../../components";
import metrix from "../../config/metrix";
import { ICONS } from "../../assets/icons";

function Index(props) {
  const [activeTab, setActiveTab] = useState(0);
  const data = [
    {
      orderNo: "1201",
      date: "20 Apr 2022",
      price: "300",
      details: ["2x All day large leather Tote bag"],
      type: 0,
    },
    {
      orderNo: "1202",
      date: "23 Apr 2022",
      price: "8000",
      details: ["10x Top Frame Flexi Bag"],
      type: 0,
    },
    {
      orderNo: "1203",
      date: "26 Apr 2022",
      price: "560",
      details: [
        "1 x 2 PC His & Her Gift Set",
        "3 x Connie Gift Sets",
        "10x Top Frame Flexi Bag",
      ],
      type: 0,
    },
  ];

  const currentTabData = [
    {
      orderNo: "1203",
      date: "26 Apr 2022",
      price: "560",
      details: ["1 x 2 PC His & Her Gift Set", "3 x Connie Gift Sets"],
      type: 1,
    },
    {
      orderNo: "1241",
      date: "20 Apr 2022",
      price: "300",
      details: ["2x All day large leather Tote bag"],
      type: 2,
    },
    {
      orderNo: "1202",
      date: "20 Jun 2022",
      price: "300",
      details: ["2x All day large leather Tote bag"],
      type: 2,
    },
    {
      orderNo: "1202",
      date: "23 Apr 2022",
      price: "8000",
      details: ["10x Top Frame Flexi Bag"],
      type: 0,
    },
  ];
  const touchableProps = {
    activeOpacity: 0.5,
  };

  const handleTabPress = (value) => {
    setActiveTab(value);
  };

  return (
    <Fragment>
      <Header backButton showSearch />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Order Details</Text>
        <View style={styles.textRow}>
          <View>
            <Text style={styles.orderNoText}>Order No. 3240</Text>
            <Text style={{ ...styles.dateText, color: "grey" }}>
              20 Apr 2022
            </Text>
          </View>
          <StatusButton type={0} />
        </View>
        <View style={styles.detailCard}>
          <View>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../../assets/images/Bag1.png")}
            />
          </View>
          <View>
            <Text style={styles.detailText}>10x Top Frame Flexi Bag</Text>
            <Text style={styles.detailText}>No. of items 02</Text>
            <Text style={styles.detailText}>Rs 3500</Text>
          </View>
        </View>
        <View
          style={{
            ...styles.orderCard,
            paddingVertical: metrix.VerticalSize(12),
          }}
        >
          <View style={styles.detailsBox}>
            <Text style={styles.dateText}>Sub Total</Text>
            <Text style={styles.dateText}>Rs 3500</Text>
          </View>
          <View style={styles.detailsBox}>
            <Text style={styles.dateText}>Discount</Text>
            <Text style={styles.dateText}>-Rs 1500</Text>
          </View>
          <View style={styles.detailsBox}>
            <Text style={styles.dateText}>Total</Text>
            <Text style={styles.dateText}>Rs 2000</Text>
          </View>
        </View>
        <Text style={styles.subTitle}>Delivery Details</Text>
        <View style={styles.orderCard}>
          <View style={styles.deliveryDetailRow}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={ICONS.phoneIcon}
            />
            <Text style={{ ...styles.dateText, color: "grey" }}>
              0343 2323150
            </Text>
          </View>
          <View style={styles.deliveryDetailRow}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={ICONS.emailIcon}
            />
            <Text style={{ ...styles.dateText, color: "grey" }}>
              hadi.shaikh@gmail.com
            </Text>
          </View>
          <View style={styles.deliveryDetailRow}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={ICONS.locationIcon}
            />
            <Text style={{ ...styles.dateText, color: "grey" }}>
              9th street A-78 MACHS karachi
            </Text>
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
}

export default Index;
