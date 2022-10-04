import React, { Fragment, useState, useEffect } from "react";
import { Image, TouchableOpacity, View, ScrollView } from "react-native";
import { Text, TextInput, Header, CustomButton } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./style";
import Navigator from "../../navigation/root";
import { SCREENS } from "../../config/constants/screens";
import DatePicker from "react-native-date-picker";
import { showToast } from "../../utils";
import { useSelector } from "react-redux";
import { updateProfile, getProfile } from "../../config/api/auth";
import axios from "../../config/api/index";
import { EMAIL_REGEX } from "../../config/constants";
import { useTranslation } from "react-i18next";
import metrix from "../../config/metrix";
import { isEmpty } from "lodash";
function Index(props) {
  const [isLoading, setLoading] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [isCityOpen, setCityOpen] = useState(false);
  const [cityList, setCityList] = useState([]);
  const { codes } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const touchableProps = {
    activeOpacity: 0.5,
    // hitSlop: {
    //   top: 20,
    //   bottom: 20,
    //   left: 20,
    //   right: 20,
    // },
  };
  useEffect(() => {
    // console.log("props.route.params", props.route.params.user);
    setUserObj(props.route?.params?.user);
    setCityList(props.route?.params?.cityList);
  }, [props.route.params]);

  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalvisible] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      const { id, dob, city, phone, email, firstName, lastName } = userObj;
      const isEmailValid = EMAIL_REGEX.test(email);
      // console.log("isEmailValid", isEmailValid);
      // if(isEmailValid)
      console.log(isEmpty(dob), "date of birth");
      // console.log(isEmpty(isEmailValid), "is email empty");
      if (isEmpty(email)) {
        showToast({
          type: "error",
          text: t("Email address is mandatory"),
        });
      } else {
        if (isEmailValid) {
          setLoading(true);
          // console.log("userObj", userObj);
          const postObj = {
            customerId: id,
            user: {
              firstName,
              email: email || "",
              lastName: lastName || "",
              phone,
              city,
              dob,
            },
          };
          // console.log("postObj", postObj);
          const { data } = await updateProfile(
            id,
            postObj.user,
            codes.accessToken
          );
          setLoading(false);
          if (data?.success) {
            showToast({
              type: "success",
              text: t("Profile updated successfully"),
            });
            Navigator.goBack();
          } else {
            showToast({
              type: "error",
              text: t("Something went wrong"),
            });
          }
        } else {
          showToast({
            type: "error",
            text: t("Email format is incorrect"),
          });
        }
      }
    } catch (error) {
      console.log("err", error);
      showToast({
        type: "error",
        text: error.response?.data?.message || error.message,
      });
      setLoading(false);
    }
  };

  const setFormValues = (key, value) => {
    setUserObj({
      ...userObj,
      [key]: value,
    });
  };
  return (
    <Fragment>
      <Header backButton text="Edit Profile" />
      <DatePicker
        modal
        open={modalVisible}
        mode="date"
        date={new Date()}
        onConfirm={(dob) => {
          setModalvisible(false);
          // console.log("dob", dob.toLocaleDateString());
          setUserObj({
            ...userObj,
            dob: dob.toString(),
          });
          setDate(dob);
        }}
        maximumDate={new Date()}
        onCancel={() => {
          setModalvisible(false);
        }}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          containLabel
          label="First Name"
          maxLength={24}
          onChangeText={(text) => setFormValues("firstName", text)}
          value={userObj?.firstName || ""}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          containLabel
          label="Last Name"
          maxLength={24}
          onChangeText={(text) => setFormValues("lastName", text)}
          value={userObj?.lastName || ""}
        />
        <TouchableOpacity
          {...touchableProps}
          onPress={() => setModalvisible(!modalVisible)}
        >
          <TextInput
            style={styles.input}
            disabled
            value={
              userObj.dob ? new Date(userObj.dob).toLocaleDateString() : "-"
            }
            containLabel
            isDob
            label="Date of Birth"
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.input]}
          placeholder="Enter mobile no."
          containLabel
          value={userObj.phone}
          label="Cell Phone"
          disabled
          textInputStyle={{ backgroundColor: "#b5b5b5" }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          containLabel
          label="Email Address"
          onChangeText={(text) => setFormValues("email", text)}
          value={userObj.email || ""}
        />
        {/* <Text style={styles.text}>Address</Text> */}
        {/* <TouchableOpacity
          onPress={handleAddAddress}
          {...touchableProps}
          style={styles.addressContainer}
        ></TouchableOpacity> */}
        <TouchableOpacity
          {...touchableProps}
          onPress={() => setCityOpen(!isCityOpen)}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter City"
            containLabel
            label="City"
            value={userObj.city || ""}
            isDropDown
            disabled
          />
        </TouchableOpacity>
        {isCityOpen && (
          <View
            style={([styles.cityView], { height: metrix.VerticalSize(100) })}
          >
            <ScrollView style={({ height: "100%" }, [styles.cityView])}>
              {cityList.map((item, i) => (
                <TouchableOpacity
                  key={i.toString()}
                  activeOpacity={0.5}
                  onPress={() => {
                    setUserObj({
                      ...userObj,
                      city: item.name,
                    });
                    setCityOpen(false);
                  }}
                >
                  <Text style={styles.cityText} size={22}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <CustomButton
          isLoading={isLoading}
          onPress={handleUpdateProfile}
          style={styles.buttonStyle}
        >
          Update
        </CustomButton>
      </KeyboardAwareScrollView>
    </Fragment>
  );
}

export default Index;
