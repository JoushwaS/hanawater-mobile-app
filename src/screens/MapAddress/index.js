import React, { Fragment, useState, useRef } from "react";
import {
  Image,
  Touchable,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { Header, CustomButton, TextInput } from "../../components";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import RNLocation from "react-native-location";
import { addAddress } from "../../config/api/auth";
// import Geolocation from "@react-native-community/geolocation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { ICONS } from "../../assets/icons";
import Navigation from "../../navigation/root";
import Geolocation from "react-native-geolocation-service";
import { Colors } from "../../config/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Text } from "../../components";

import axios from "axios";
import metrix from "../../config/metrix";
import { useEffect } from "react";
import { showToast } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { add } from "lodash";
import { SCREENS } from "../../config/constants/screens";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
// import { SCREENS } from "../../config/constants/screens";

function Index(props) {
  // const dispatch = useDispatch();
  const mapRef = useRef(null);
  let autoCompleteRef = null;
  const { t } = useTranslation();
  // const flatListRef = useRef(null);
  const { customer, codes } = useSelector((state) => state.auth);

  const [selectedBranch, setSelectedBranch] = useState(null);

  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [addressObj, setaddressObj] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [fromMap, setfromMap] = useState(false);
  const [isMapReady, setIsMapready] = useState(false);
  const latitudeDelta = 0.015;
  const longitudeDelta = 0.0121;
  const [region, setRegion] = useState({
    latitude: 24.7290947,
    longitude: 46.6628716,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  // const [initialRegion, setInitialRegion] = useState({
  //   latitude: 24.7290947,
  //   longitude: 46.6628716,
  //   latitudeDelta: 0.015,
  //   longitudeDelta: 0.0121,
  // });

  RNLocation.configure({
    desiredAccuracy: {
      ios: "bestForNavigation",
      android: "balancedPowerAccuracy",
    },
    interval: 1000,
    maxWaitTime: 1000,
  });
  const REVERSE_GEOCODE_URL =
    "https://maps.googleapis.com/maps/api/geocode/json";

  const GOOGLE_API_KEY = "AIzaSyAD_4go-J4inVINwgSN7X84ZnKq_T_k_zw";

  const reverseGeocode = (lat, lng) => {
    return axios
      .get(`${REVERSE_GEOCODE_URL}?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`)
      .then((res) => {
        console.log("REVERSE_GEOCODE_URLREVERSE_GEOCODE_URL", res);
        if (res.data.results) {
          if (res.data.results.length > 0) {
            return res.data.results;
          }
        }

        return null;
      })
      .catch((ex) => {
        console.log("ex,", ex);
        return null;
      });
  };

  const onMapLayout = () => {
    setIsMapready(true);
  };

  const setLocation = async (location, locationbasic, locationDetails) => {
    // console.log('location', location);

    let address = locationbasic.description.split(",");
    let area,
      city = null;
    if (address.length > 0) {
      area = address[0];
      city = address[1];
    }

    let fullAddress = locationDetails.formatted_address;
    const splitAddress = fullAddress.split(",");

    let addressObj = {
      customerId: customer?.id,
      fullAddress: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
      area: area,
      city: city,
      lat: "" + location.lat,
      lng: "" + location.lng,
      comment: "Default",
    };
    setlatitude(location.lat);
    setlongitude(location.lng);
    setaddressObj(addressObj);
    setRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    });
    await mapRef.current.animateToRegion(
      {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
      1000
    );
  };
  const getLocationFromMap = async ({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  }) => {
    // if (
    //   latitude &&
    //   longitude &&
    //   latitude !== region.latitude &&
    //   longitude !== region.longitude
    // ) {
    // console.log(latitude, longitude,latitudeDelta,longitudeDelta, "here are the lat");
    // console.log('autoCompleteRef', this.autoCompleteRef);
    try {
      const googleAddresses = await reverseGeocode(latitude, longitude);
      // console.log("googleAddresses", googleAddresses[0]);
      if (googleAddresses.length > 0) {
        const fullAddress = googleAddresses[0]["formatted_address"];
        const { lat, lng } = googleAddresses[0].geometry.location;
        const splitAddress = fullAddress.split(",");
        // autoCompleteRef.setAddressText(
        //   `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`
        // );
        const addressObj = {
          fullAddress: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
          area: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
          city: splitAddress[splitAddress.length - 2],
          // street: splitAddress[0],
          // state: splitAddress[1],
          lat: "" + lat,
          lng: "" + lng,
          comment: "Default",
        };
        setlatitude(latitude);
        setlongitude(longitude);
        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        });
        setaddressObj(addressObj);
        setLoading(isLoading);

        setfromMap(true);
      }
    } catch (error) {
      console.log("getLocationFromMap", error.message);
    }
    // } else {
    //   // alert("inside the else");
    // }
  };

  const getLocations = async () => {
    try {
      setLoading(true);
      let granted = await RNLocation.requestPermission({
        ios: "always",
        android: {
          detail: "coarse",
        },
      });
      // console.log("AddAddress/containers/addaddress.js", granted);
      if (!granted) {
        showToast({
          text: t("Location Permission denied"),
          type: "error",
        });

        let googleAddresses = await reverseGeocode(21.4925, 39.17757);
        let address = googleAddresses[0]["formatted_address"];

        let splitAddress = address.split(",");

        let stateAddress = {
          customerId: customer?.id,
          area: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
          // street: splitAddress[0],
          // state: splitAddress[1],
          city: splitAddress[splitAddress.length - 2],
          fullAddress: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
          lat: location?.latitude,
          lng: location?.longitude,
          comment: "Default",
        };
        setlatitude(21.4925);
        setlongitude(39.17757);
        setRegion({
          latitudeDelta: 0,
          longitudeDelta: 0,
          latitude: 21.4925,
          longitude: 39.17757,
        });
        setaddressObj(stateAddress);

        console.log("setaddressObj", setaddressObj);
        setfromMap(true);
      } else {
        Geolocation.getCurrentPosition(
          async (success) => {
            let location = {
              latitude: success.coords.latitude.toString(),
              longitude: success.coords.longitude.toString(),
            };
            let googleAddresses = await reverseGeocode(
              location?.latitude,
              location?.longitude
            );
            console.log("googleAddresses", googleAddresses);
            if (!googleAddresses) {
              showToast({
                type: "error",
                text: t("No address found"),
              });
            }
            let address = googleAddresses[0]["formatted_address"];
            let splitAddress = address.split(",");
            console.log("splitAddress", splitAddress);

            let stateAddress = {
              customerId: customer?.id,
              area: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
              // street: splitAddress[0],
              // state: splitAddress[1],
              city: splitAddress[splitAddress.length - 2],
              fullAddress: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
              lat: location?.latitude,
              lng: location?.longitude,
              comment: "Default",
            };

            setlatitude(location?.latitude);
            setlongitude(location?.longitude);
            setaddressObj(stateAddress);
            setRegion({
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
              latitude: location?.latitude,
              longitude: location?.longitude,
            });
            console.log("region,", location);
            setLoading(false);

            // const cI = setInterval(() => {
            //   if (mapRef && isMapReady) {
            //     mapRef.current.animateToRegion(
            //       {
            //         latitudeDelta,
            //         longitudeDelta,
            //         latitude: location?.latitude,
            //         longitude: location?.longitude,
            //       },
            //       2000
            //     );
            //     clearInterval(cI);
            //   }
            // }, 1000);
          },
          (e) => {
            showToast({
              type: "error",
              text: e.message,
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
          }
        );
      }
    } catch (error) {
      setlatitude(0);
      setlongitude(0);
      setRegion({
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        latitude: 0,
        longitude: 0,
      });
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const submit = async () => {
    // console.log("addressObj", addressObj, "addressObj");
    try {
      const { data: _data } = await addAddress(addressObj);
      // console.log("_data_data", _data);
      if (_data?.error === true) {
        showToast({
          // text: _data?.message,
          text: "Sorry! Currently we are not availble in your region.",
          type: "error",
        });
      } else {
        Navigation.goBack();
      }
    } catch (error) {
      console.log("error", error.response.data.message);
      showToast({
        text: error.response.data.message,
        type: "error",
      });
    }
  };
  // let markers = [
  //   {
  //     latitude: 24.8636,
  //     longitude: 67.0731,
  //     title: "Foo Place",
  //     subtitle: "1234 Foo Drive",
  //   },
  // ];

  return (
    <Fragment>
      <Header backButton text={t("Select Address")} />
      <View style={styles.container}>
        <Image
          source={ICONS.location}
          resizeMode="contain"
          style={styles.markerFixed}
        />
        {/* {latitude && longitude ? ( */}
        <Fragment>
          <MapView
            ref={mapRef}
            onLayout={onMapLayout}
            loadingEnabled={true}
            // zoomEnabled
            followsUserLocation={false}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            // showsUserLocation={true}
            // userLocationUpdateInterval={1}
            loadingIndicatorColor={Colors.primary}
            onRegionChangeComplete={(region) => {
              // debounce(() => getLocationFromMap(region), 200);
              // console.log('region',region)
              getLocationFromMap(region);
              // console.log('autocomplete',autoCompleteRef)
              // getLocationFromMap(region)
              // console.log("this is region", region);
              // setRegion(region);
              // getLocationFromMap(region);
              // setRegion(region);
              // debounce(setRegion(region), 2000);
            }}
            // onRegionChange={(region) => {
            //   console.log("region", region);
            //   setRegion(region);
            // }}
            region={{
              latitude: parseFloat(region.latitude),
              longitude: parseFloat(region.longitude),
              latitudeDelta: parseFloat(region.latitudeDelta),
              longitudeDelta: parseFloat(region.longitudeDelta),
            }}
            // initialRegion={initialRegion}
            // region={region}
            // region={region}
            // annotations={markers}
          >
            <Image
              source={ICONS.location}
              resizeMode="contain"
              style={styles.markerFixed}
            />
          </MapView>
          <View style={styles.searchbox}>
            {/* {console.log('addressObj.fullAddress',addressObj.fullAddress)} */}
            <GooglePlacesAutocomplete
              editable={true}
              suppressDefaultStyles={false}
              ref={(ref) => (autoCompleteRef = ref)}
              placeholder={addressObj?.fullAddress}
              textInputProps={{
                placeholderTextColor: "grey",
              }}
              minLength={3}
              autoFocus={false}
              listViewDisplayed={false}
              returnKeyType={"default"}
              onPress={(data, details) => {
                setLocation(details.geometry.location, data, details);
                Keyboard.dismiss();
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: GOOGLE_API_KEY,
                language: "en", // language of the results,
                components: "country:sa",
                location: latitude + "," + longitude,
                radius: "100000",
                // types: '(cities)' // default: 'geocode'
              }}
              setAddressText={(e) => {
                console.log("setAddressText", e);
              }}
              debounce={500} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              fetchDetails={true}
              renderLeftButton={() => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: metrix.HorizontalSize(10),
                    }}
                  >
                    <Image source={ICONS.search} style={styles.image} />
                  </View>
                );
              }}
              renderRightButton={() => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={getLocations}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Image source={ICONS.locationPicker} style={styles.image} />
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 120,
                    }}
                  >
                    <Text>No Results Found</Text>
                  </View>
                );
              }}
              styles={{
                textInputContainer: {
                  borderTopWidth: 0,
                  // borderBottomWidth: 0,
                  backgroundColor: "#fff",
                },
                textInput: {
                  borderWidth: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  color: "#5d5d5d",
                  fontSize: 16,
                },
                predefinedPlacesDescription: {
                  color: "#1faadb",
                },
              }}
              currentLocation={true}
            />
          </View>
          <CustomButton
            style={styles.buttonStyle}
            onPress={() => submit()}
            type="large"
          >
            {t("Select Address")}
          </CustomButton>
        </Fragment>
        {/* ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontSize: metrix.CustomFontSize(20),
                textAlign: "center",

                color: Colors.primary,
              }}
            >
              Loading ...
            </Text>
          </View>
        )} */}
      </View>
    </Fragment>
  );
}

export default Index;
