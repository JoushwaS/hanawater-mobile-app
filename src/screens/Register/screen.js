import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, View, Image, ScrollView } from "react-native";
import {
  Text,
  TextInput,
  CustomButton,
  Modal,
  IconButton,
} from "../../components";
import Navigation from "../../navigation/root";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckBox from "@react-native-community/checkbox";
import styles from "./style";
import { ICONS } from "../../assets/icons";
import { SCREENS } from "../../config/constants/screens";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, userSignUp } from "../../store/actions";
import { getItem, showToast } from "../../utils";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../assets/images";
function Index(props) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [phone, setPhone] = useState("");
  const [term, setTerm] = useState("");
  const [prefix, setPrefix] = useState("+966");
  const [modalVisible, setModalVisible] = useState(false);
  const viewRef = useRef(null);

  const { isLoading, terms } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    terms ? setTerm(terms) : null;
  }, [terms]);

  const handleSignUp = () => {
    if (phone == "") {
      showToast({
        text: t("Please enter phone number"),
        type: "error",
      });
    } else if (phone.length < 9) {
      showToast({
        text: t("Input Validation failed"),
        type: "error",
      });
    } else if (!toggleCheckBox) {
      showToast({
        text: t("Accept terms and conditions"),
        type: "error",
      });
    } else {
      let userObj = {
        phone: "+966" + phone,
        // phone: "+923092954640",
        // phone: "+923213152067",

        //Dummy number
      };
      let formBody = [];
      for (let property in userObj) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(userObj[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      dispatch(userLogout());
      dispatch(userSignUp(formBody, props, phone));
    }
  };

  const handleTerms = () => {
    setModalVisible(true);
  };

  return (
    <KeyboardAwareScrollView>
      <View
        style={{ ...styles.ContainerPadding, opacity: modalVisible ? 0.3 : 1 }}
      >
        <Modal
          viewRef={viewRef}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        >
          <View style={styles.modalView}>
            <IconButton
              buttonStyle={styles.closeIcon}
              icon={IMAGES.closeIcon}
              onPress={() => setModalVisible(false)}
            />
            <Text style={styles.modalHeading}>Terms & Conditions</Text>
            <ScrollView scrollEnabled style={{ height: 100 }}>
              <Text style={styles.modalText}>
                {term}
                {/* {console.log(terms)} */}
              </Text>
            </ScrollView>
          </View>
        </Modal>
        <View style={styles.containerStyle}>
          <Image source={ICONS.logo} style={styles.logo} />
          <Text style={styles.headingText}>{t("sign_in_register")}</Text>
        </View>
        <TextInput
          // placeholder="Enter Mobile Number"
          containLabel
          auth
          onChangeText={(text) => setPhone(text)}
          keyboardType="numeric"
          label={t("mobile_number")}
          maxLength={9}
          value={phone}
        />
        <View style={styles.privacyRow}>
          <CheckBox
            style={{
              width: metrix.HorizontalSize(20),
              height: metrix.VerticalSize(20),
            }}
            boxType="square"
            disabled={false}
            value={toggleCheckBox}
            onFillColor={Colors.primary}
            onCheckColor={Colors.White}
            onTintColor={Colors.primary}
            tintColors={{ true: Colors.primary, false: Colors.LightGrey }}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <TouchableOpacity
            style={{
              marginHorizontal: metrix.HorizontalSize(10),
            }}
            onPress={handleTerms}
            activeOpacity={0.5}
          >
            <Text style={styles.subHeading}>
              {t("agree_with_our_terms_and_conditions")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <CustomButton
            isLoading={isLoading}
            type="large"
            style={styles.buttonStyle}
            onPress={handleSignUp}
          >
            {t("sign_in_register")}
          </CustomButton>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
