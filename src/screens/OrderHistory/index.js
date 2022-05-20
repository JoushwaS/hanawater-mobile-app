import React, { Fragment, useState } from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { Header, StatusButton } from "../../components";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";

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

  const handleCardPress = () => {
    Navigation.navigate(SCREENS.ORDER_DETAILS);
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <Header backButton showSearch />
        <View style={styles.tabView}>
          <TouchableOpacity
            style={
              activeTab === 0
                ? {
                    borderBottomColor: Colors.primary,
                    borderBottomWidth: metrix.VerticalSize(2),
                  }
                : {}
            }
            onPress={() => handleTabPress(0)}
            {...touchableProps}
          >
            <Text
              style={[styles.tabText, activeTab === 0 ? styles.tabActive : {}]}
            >
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeTab === 1
                ? {
                    borderBottomColor: Colors.primary,
                    borderBottomWidth: metrix.VerticalSize(2),
                  }
                : {}
            }
            onPress={() => handleTabPress(1)}
            {...touchableProps}
          >
            <Text
              style={[styles.tabText, activeTab === 1 ? styles.tabActive : {}]}
            >
              Current
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 0 ? (
          <FlatList
            data={data}
            numColumns={1}
            contentContainerStyle={styles.listView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={handleCardPress}
                style={styles.orderCard}
                {...touchableProps}
              >
                <View style={styles.textRow}>
                  <Text style={styles.orderNoText}>
                    Order No. {item.orderNo}
                  </Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <View style={styles.detailsBox}>
                  <View style={{}}>
                    {item.details.map((detail, index) => (
                      <Text
                        style={styles.detailText}
                        numberOfLines={1}
                        key={index.toString()}
                      >
                        {detail}
                      </Text>
                    ))}
                  </View>
                  <StatusButton type={item.type} />
                </View>
                <Text style={styles.dateText}>Price : {item.price}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Fragment>
            <View style={styles.typeView}>
              <StatusButton type={2} />
              <StatusButton type={1} />
              <StatusButton type={4} />
            </View>
            <FlatList
              data={currentTabData}
              numColumns={1}
              contentContainerStyle={styles.listView2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={handleCardPress}
                  style={styles.orderCard}
                  {...touchableProps}
                >
                  <View style={styles.textRow}>
                    <Text style={styles.orderNoText}>
                      Order No. {item.orderNo}
                    </Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <View style={styles.detailsBox}>
                    <View style={{}}>
                      {item.details.map((detail, index) => (
                        <Text
                          style={styles.detailText}
                          numberOfLines={1}
                          key={index.toString()}
                        >
                          {detail}
                        </Text>
                      ))}
                    </View>
                    <StatusButton type={item.type} />
                  </View>
                  <Text style={styles.dateText}>Price : {item.price}</Text>
                </TouchableOpacity>
              )}
            />
          </Fragment>
        )}
      </View>
    </Fragment>
  );
}

export default Index;
