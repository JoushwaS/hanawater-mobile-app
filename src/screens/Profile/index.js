import React, { Fragment, useState, useCallback, useRef } from "react";
import {
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { Text, TextInput, Header, Modal, CustomButton } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./style";
import { ICONS } from "../../assets/icons";
import Navigator from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getCities, deleteProfile } from "../../config/api/auth";
import _ from "lodash";
import { Colors, Fonts } from "../../config/theme";

import { userLogout } from "../../store/actions";
// import DatePicker from "react-native-date-picker";
// import moment from "moment";
import { store } from "../../store";
import { t } from "i18next";
import { useFocusEffect } from "@react-navigation/native";
import { updateUserData } from "../../store/actions";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";

function Index(props) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { customer } = useSelector((state) => state.auth.customer);
  const { codes } = useSelector((state) => state.auth);

  const [refreshing, setRefreshing] = useState(true);
  const [cities, setCities] = useState([]);

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [selectedcity, setselectedcity] = useState("");
  const [userObj, setUserObj] = useState({});
  const { t } = useTranslation();
  const deleteUserModalRef = useRef(null);

  const [dob, setDob] = useState("");
  const [modalVisible, setModalvisible] = useState(false);
  const [deleteAccountModalVisible, setdeleteAccountModalVisible] =
    useState(false);
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
        console.log("citiess.data", citiess.data);
        console.log("profile", profile.data.city);
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
  const handleDeleteAccount = async () => {
    const customerID = userObj?.id;

    await deleteProfile(customerID, codes.accessToken)
      .then((res) => {
        console.log("delete account success >", res);
        if (res.status >= 200) {
          showToast({
            type: "success",
            text: t("Account Deleted Successfully"),
          });
          setTimeout(() => {
            setdeleteAccountModalVisible(false);
            dispatch(userLogout());
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(" delete account failed!", error);
      });
  };
  return (
    <Fragment>
      <Header text={t("profile")} />
      <Modal
        viewRef={deleteUserModalRef}
        setModalVisible={setdeleteAccountModalVisible}
        modalVisible={deleteAccountModalVisible}
      >
        <View style={styles.modalView}>
          <View>
            <Text style={styles.modalHeading}> {t("delete_account")}</Text>
            <Text style={{ textAlign: "center" }}>
              {t("You'll Permanently lose your")}
            </Text>
            <View
              style={{
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text>- {t("profile")}</Text>
              <Text>- {t("Order History")}</Text>
            </View>
          </View>
          <View style={styles.bottomRow}>
            <CustomButton
              onPress={() => {
                setdeleteAccountModalVisible(false);
              }}
              style={styles.buttonStyle}
              textStyle={{ color: Colors.primary }}
              variant="outlined"
            >
              {t("Cancel")}
            </CustomButton>
            <CustomButton
              onPress={() => {
                handleDeleteAccount();
              }}
              style={styles.buttonStyle}
              variant="filled"
            >
              {t("Confirm")}
            </CustomButton>
          </View>
        </View>
      </Modal>
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
          <View style={{ padding: 10 }}>
            <CustomButton
              style={{ alignSelf: "center" }}
              type="large"
              onPress={() => {
                // Navigation.goBack();
                // handleDeleteAccount();
                setdeleteAccountModalVisible(!deleteAccountModalVisible);
              }}
              variant="filled"
            >
              {t("delete_account")}
            </CustomButton>
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.emptyText}>
            Please Register/Sign In to see your profile
          </Text>
          <CustomButton onPress={handleLoginPress}>
            Register/Sign In
          </CustomButton>
        </View>
      )}
    </Fragment>
  );
}

export default Index;
