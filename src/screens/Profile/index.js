import React, { Fragment, useState, useCallback } from "react";
import {
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { Text, TextInput, Header, CustomButton } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./style";
import { ICONS } from "../../assets/icons";
import Navigator from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getCities } from "../../config/api/auth";
import _ from "lodash";
// import DatePicker from "react-native-date-picker";
// import moment from "moment";
import { store } from "../../store";
import { t } from "i18next";
import { useFocusEffect } from "@react-navigation/native";
import { updateUserData } from "../../store/actions";

function Index(props) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { customer } = useSelector((state) => state.auth.customer);
  const { codes } = useSelector((state) => state.auth.codes);

  const [refreshing, setRefreshing] = useState(true);
  const [cities, setCities] = useState([]);

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [selectedcity, setselectedcity] = useState("");
  const [userObj, setUserObj] = useState({});

  const [dob, setDob] = useState("");
  const [modalVisible, setModalvisible] = useState(false);

  const touchableProps = {
    activeOpacity: 0.5,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  };

  const onEditPress = () => {
    Navigator.navigate(SCREENS.EDIT_PROFILE, {
      user: userObj,
      cityList: cities,
    });
  };

  const getData = () => {
    setRefreshing(true);
    Promise.all([getCities(), getProfile()])
      .then(([{ data: citiess }, { data: profile }]) => {
        console.log('citiess.data',citiess.data)
        console.log("profile",profile.data.city)
        setCities(citiess.data);
        // let cityObj = _.find(citiess.data, (i) => i.name == profile.data.city);
        setUserObj(profile?.data);
        setselectedcity(profile?.data?.city);
        setName(profile?.data?.firstName);
        setPhone(profile?.data?.phone);
        setEmail(profile?.data?.email);
        setDob(profile?.data?.dob);
        setLastName(profile?.data?.lastName);
        setRefreshing(false);
        dispatch(updateUserData(profile.data));
      })
      .catch((err) => {
        setRefreshing(false);
        console.error(err);
      })
      .finally(() => {});
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const handleLoginPress = () => {
    Navigator.navigate(SCREENS.AUTH_STACK, {
      screen: SCREENS.REGISTER_SCREEN,
      params: {
        fromProfile: true,
      },
    });
  };

  return (
    <Fragment>
      <Header text={t("profile")} />
      {isAuthenticated ? (
        <KeyboardAwareScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getData()}
            />
          }
        >
          <TouchableOpacity
            onPress={onEditPress}
            {...touchableProps}
            style={styles.editIconContainer}
          >
            <Image source={ICONS.edit} style={styles.editicon} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={name || "-"}
            containLabel
            label="First Name"
            disabled
          />
          <TextInput
            style={styles.input}
            disabled
            value={lastname || "-"}
            containLabel
            label="Last Name"
          />
          <TouchableOpacity onPress={() => setModalvisible(!modalVisible)}>
            <TextInput
              style={styles.input}
              disabled
              value={dob || "-"}
              containLabel
              label="Date of Birth"
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Enter mobile no."
            containLabel
            label="Cell Phone"
            disabled
            textInputStyle={{ backgroundColor: "#b5b5b5" }}
          />
          <TextInput
            style={styles.input}
            value={email || "-"}
            placeholder="Enter email address"
            containLabel
            label="Email Address"
            disabled
          />
          <TouchableOpacity disabled={true}>
            <TextInput
              style={styles.input}
              disabled
              value={selectedcity}
              placeholder="Enter City"
              containLabel
              label="City"
            />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.emptyText}>Please Register/Sign In to see your profile</Text>
          <CustomButton onPress={handleLoginPress}>Register/Sign In</CustomButton>
        </View>
      )}
    </Fragment>
  );
}

export default Index;
