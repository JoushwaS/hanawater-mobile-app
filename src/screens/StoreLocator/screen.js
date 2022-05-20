import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
} from "react-native";
import { Text, Button } from "../../components";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import FastImageLib from "react-native-fast-image";
import FastImage from "../../components/FastImage";
import Branches from "../../components/Branches";
import metrix from "../../config/metrix";
import { Colors } from "../../config/theme";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { ICONS } from "../../assets/icons";

function Index(props) {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const flatListRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: 24.8636501,
    longitude: 67.0753051,
    latitudeDelta: 0.15,
    longitudeDelta: 0.121,
  });

  const branches = [
    {
      latitude: 24.862213,
      longitude: 67.0753051,
      id: 1,
    },
    {
      latitude: 24.862213,
      longitude: 67.0599235,
      id: 2,
    },
  ];
  const [isCityOpen, setCityOpen] = useState(false);
  const [isBranchOpen, setBranchOpen] = useState(false);
  const mall_branches = [
    { title: "MJJ Attrium Mall" },
    { title: "MJJ Attrium Mall" },
  ];
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const locations = [
    {
      image: IMAGES.branch,
      contact: "02135643789",
      time1: "Mon – Thu, 11:00am to 10:00pm",
      time2: "Fri - Sun, 11:00am to 11:00pm",
      address:
        "Shop # 41-46, Ground Floor Atrium Mall, Fatima Jinnah Road, Saddar, Civil Lines, Karachi, Karachi City, Sindh, Pakistan",
    },
    {
      image: IMAGES.branch,
      contact: "02135643789",
      time1: "Mon – Thu, 11:00am to 10:00pm",
      time2: "Fri - Sun, 11:00am to 11:00pm",
      address:
        "Shop # 41-46, Ground Floor Atrium Mall, Fatima Jinnah Road, Saddar, Civil Lines, Karachi, Karachi City, Sindh, Pakistan",
    },
    {
      image: IMAGES.branch,
      contact: "02135643789",
      time1: "Mon – Thu, 11:00am to 10:00pm",
      time2: "Fri - Sun, 11:00am to 11:00pm",
      address:
        "Shop # 41-46, Ground Floor Atrium Mall, Fatima Jinnah Road, Saddar, Civil Lines, Karachi, Karachi City, Sindh, Pakistan",
    },
  ];
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [sortOptions, setSortOptions] = useState(["Karachi Pakistan"]);
  const [branchtext, setBranchText] = useState(["MJJ Attrium Mall"]);

  const onSelectBranch = (branch, index) => {
    // console.log({branch, index});
    setSelectedBranch(branch);
  };
  const handleSortPress = () => {
    setCityOpen(!isCityOpen);
  };
  const handleBranchPress = () => {
    setBranchOpen(!isBranchOpen);
  };
  const onSortPress = () => {
    setCityOpen(false);
  };
  const onBranchOpen = (text) => {
    setBranchOpen(false);
    setBranchText(text);
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={region}
      >
        {branches.map((branch, index) => (
          <Marker
            key={index.toString()}
            onPress={() => {
              onSelectBranch(branch, index);
            }}
            coordinate={{
              latitude: branch.latitude,
              longitude: branch.longitude,
            }}
          >
            {selectedBranch?.id === branch.id ? (
              <Image source={ICONS.setlocation} style={styles.locImg} />
            ) : (
              <Image source={ICONS.greylocation} style={styles.locImg} />
            )}
          </Marker>
        ))}
      </MapView>
      <View style={{ alignItems: "center" }}>
        <View style={styles.searchAddress}>
          <View style={styles.rowContainerBranches}>
            <View>
              <TouchableOpacity
                onPress={handleSortPress}
                {...touchableProps}
                style={styles.sortView}
              >
                <Text>Karachi Pakistan</Text>
                <Image
                  resizeMode="contain"
                  style={styles.arrowDown}
                  source={ICONS.arrowDown}
                />
              </TouchableOpacity>
              {isCityOpen && (
                <View style={styles.sortOptions}>
                  {sortOptions.map((text, i) => (
                    <TouchableOpacity
                      style={{
                        ...styles.sortOption,
                      }}
                      onPress={() => onSortPress(text)}
                      {...touchableProps}
                      key={i.toString()}
                    >
                      <Text>{text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <View>
              <TouchableOpacity
                onPress={handleBranchPress}
                {...touchableProps}
                style={styles.sortView}
              >
                <Text>{branchtext}</Text>
                <Image
                  resizeMode="contain"
                  style={styles.arrowDown}
                  source={ICONS.arrowDown}
                />
              </TouchableOpacity>
              {isBranchOpen && (
                <View style={styles.sortOptions}>
                  {mall_branches.map((item, i) => (
                    <TouchableOpacity
                      style={{
                        ...styles.sortOption,
                      }}
                      onPress={() => onBranchOpen(item?.title)}
                      {...touchableProps}
                      key={i.toString()}
                    >
                      <Text>{item?.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.branchesContainer}>
        <FlatList
          ref={flatListRef} // add ref
          keyExtractor={(item, index) => item.id + "key"}
          horizontal
          data={locations}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity activeOpacity={0.9}>
                <Branches item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

export default Index;
