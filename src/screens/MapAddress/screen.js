import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
} from "react-native";
import { Text, Button, TextInput } from "../../components";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { ICONS } from "../../assets/icons";
import Navigation from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";

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

  const onSelectBranch = (branch, index) => {
    // console.log({branch, index});
    setSelectedBranch(branch);
  };

  const addressDetails = () => {
    return (
      <KeyboardAwareScrollView>
        <TextInput
          placeholder="Enter Street No"
          containLabel
          label="Street No."
        />
        <TextInput
          placeholder="Enter Floor/ Flat No."
          containLabel
          label="Floor/ Flat No."
        />
        <TextInput placeholder="Enter Area" containLabel label="Area" />
        <TextInput placeholder="Enter Zip Code" containLabel label="Zip Code" />
        <TextInput placeholder="Enter City" containLabel label="City" />
        <View style={{ alignItems: "center" }}>
          <Button
            buttonStyle={styles.buttonStyle}
            variant="filled"
            onPress={() => Navigation.goBack()}
          >
            Save & Continue
          </Button>
        </View>
      </KeyboardAwareScrollView>
    );
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
          <View style={styles.searchbox}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                Viewstyle={styles.input}
                textInputStyle={styles.input}
              />
              <Image source={ICONS.filter} style={styles.image} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.branchesContainer}>
        <View style={styles.box}>{addressDetails()}</View>
      </View>
    </View>
  );
}

export default Index;
