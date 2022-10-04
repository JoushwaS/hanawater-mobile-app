import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text, TextInput, CustomButton } from "../../components";
import Navigator from "../../navigation/root";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "../../config/theme";
import styles from "./style";
import { ICONS } from "../../assets/icons";
import metrix from "../../config/metrix";
import { setUserData, userLogout, verifyOTP } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../utils";
import { useTranslation } from "react-i18next";
import { loginUser } from "../../config/api/auth";
// import { I18nManager } from "react-native";

function Index(props) {
  const touchableProps = {
    activeOpacity: 0.5,
  };

  const { t, i18n } = useTranslation();

  const { isLoading } = useSelector((state) => state.common);
  const { customer, codes } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const code1Ref = useRef();
  const code2Ref = useRef();
  const code3Ref = useRef();
  const code4Ref = useRef();
  console.log(t, "this is adfdafdaf");
  const [resendCode, setResendCode] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);

  const [counter, setCounter] = useState(50);

  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");

  useEffect(() => {
    counter > 0
      ? setTimeout(() => setCounter(counter - 1), 1000)
      : setResendCode(true);
  }, [counter]);

  const handleResetCode = async () => {
    try {
      dispatch(userLogout());
      setResendLoader(true);
      setResendCode(false);
      setCounter(50);
      let userObj = {
        phone: "+966" + props.route?.params?.phone,
      };
      let formBody = [];
      for (let property in userObj) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(userObj[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      const { data: customerData } = await loginUser(formBody);
      const { codes, customer } = customerData.data;
      dispatch(setUserData({ codes, customer, isAuthenticated: false }));
      setResendLoader(false);
      // console.log("customerData", customerData);
      showToast({
        type: "success",
        text: t("OTP resend"),
      });
    } catch (error) {
      setResendLoader(false);
      showToast({
        type: "error",
        text: error?.response?.data?.message || error.message,
      });
    }
  };

  const handleSubmit = () => {
    // console.log(code1, code2, code3, code4);
    if (code1 == "" || code2 == "" || code3 == "" || code4 == "") {
      showToast({
        text: t("Please enter verification code"),
        type: "error",
      });
    } else if (code1 && code2 && code3 && code4) {
      let otpObj = {
        code: code1 + code2 + code3 + code4,
      };
      let formBody = [];
      for (let property in otpObj) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(otpObj[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      dispatch(verifyOTP(formBody, codes.accessToken, props));
    } else {
      showToast({
        text: t("Input Validation failed"),
        type: "error",
      });
    }
  };

  const onKeyPress = (field_no, e) => {
    if (e.nativeEvent.text == undefined && e.nativeEvent.key == "Backspace") {
      switch (field_no) {
        case 0: {
          return;
        }

        case 1: {
          code1Ref.current.focus();

          return;
        }

        case 2: {
          code2Ref.current.focus();

          return;
        }

        case 3: {
          code3Ref.current.focus();

          return;
        }
      }
    }
  };

  const onChange = (field_no, e) => {
    if (e.nativeEvent.text != undefined) {
      if (e.nativeEvent.text.length > 0) {
        switch (field_no) {
          case 0: {
            setCode1(e.nativeEvent.text);
            code2Ref.current.focus();
            return;
          }
          case 1: {
            code3Ref.current.focus();
            setCode2(e.nativeEvent.text);
            return;
          }
          case 2: {
            code4Ref.current.focus();
            setCode3(e.nativeEvent.text);
            return;
          }
          case 3: {
            setCode4(e.nativeEvent.text);
            return;
          }
        }
      } else {
        switch (field_no) {
          case 0: {
            setCode1(e.nativeEvent.text);
            return;
          }
          case 1: {
            setCode2(e.nativeEvent.text);
            return;
          }
          case 2: {
            setCode3(e.nativeEvent.text);
            return;
          }
          case 3: {
            setCode4(e.nativeEvent.text);
            return;
          }
        }
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.ContainerPadding}>
        <View style={[styles.containerStyle]}>
          <Image source={ICONS.logo} style={styles.logo} />
          <Text style={styles.headingText}>{t("Verification Code")}</Text>
          <Text style={styles.subText}>
            {t("Please enter the OTP sent to your cell number")}
          </Text>

          <View
            style={{
              flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <View
              style={[
                styles.box,
                {
                  marginLeft:
                    i18n.language === "ar"
                      ? metrix.HorizontalSize(0)
                      : metrix.HorizontalSize(0),
                },
              ]}
            >
              <TextInput
                textInputStyle={styles.boxinput}
                onChangeText={(text) => setCode1(text)}
                ref={code1Ref}
                onChange={(e) => onChange(0, e)}
                onKeyPress={(e) => onKeyPress(0, e)}
                maxLength={1}
                selectTextOnFocus={true}
                value={code1}
                keyboardType="numeric"
                selectionColor={Colors.primary}
              />
            </View>
            <View
              style={[
                styles.box,
                {
                  marginRight:
                    i18n.language === "ar"
                      ? metrix.HorizontalSize(27)
                      : metrix.HorizontalSize(0),

                  marginLeft:
                    i18n.language === "en"
                      ? metrix.HorizontalSize(27)
                      : metrix.HorizontalSize(0),
                },
              ]}
            >
              <TextInput
                textInputStyle={styles.boxinput}
                onChangeText={(text) => setCode2(text)}
                ref={code2Ref}
                onChange={(e) => onChange(1, e)}
                onKeyPress={(e) => onKeyPress(1, e)}
                maxLength={1}
                selectTextOnFocus={true}
                value={code2}
                keyboardType="numeric"
                selectionColor={Colors.primary}
              />
            </View>
            <View
              style={[
                styles.box,
                {
                  marginRight:
                    i18n.language === "ar"
                      ? metrix.HorizontalSize(27)
                      : metrix.HorizontalSize(0),

                  marginLeft:
                    i18n.language === "en"
                      ? metrix.HorizontalSize(27)
                      : metrix.HorizontalSize(0),
                },
              ]}
            >
              <TextInput
                textInputStyle={styles.boxinput}
                value={code3}
                onChangeText={(text) => setCode3(text)}
                selectTextOnFocus={true}
                ref={code3Ref}
                onChange={(e) => onChange(2, e)}
                onKeyPress={(e) => onKeyPress(2, e)}
                maxLength={1}
                keyboardType="numeric"
                selectionColor={Colors.primary}
              />
            </View>
            <View
              style={[
                styles.box,
                {
                  marginRight:
                    i18n.language === "ar"
                      ? metrix.HorizontalSize(27)
                      : metrix.HorizontalSize(0),

                  marginLeft:
                    i18n.language === "en"
                      ? metrix.HorizontalSize(27)
                      : metrix.HorizontalSize(0),
                },
              ]}
            >
              <TextInput
                textInputStyle={styles.boxinput}
                value={code4}
                onChangeText={(text) => setCode4(text)}
                ref={code4Ref}
                maxLength={1}
                onChange={(e) => onChange(3, e)}
                onKeyPress={(e) => onKeyPress(3, e)}
                selectTextOnFocus={true}
                keyboardType="numeric"
                selectionColor={Colors.primary}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <CustomButton
            isLoading={isLoading}
            type="large"
            onPress={handleSubmit}
          >
            {t("confirm")}
          </CustomButton>
          <CustomButton
            type="large"
            textStyle={{ color: Colors.primary }}
            variant="outlined"
            onPress={handleResetCode}
            disabled={!resendCode}
            isLoading={resendLoader}
          >
            {t("resend")}
          </CustomButton>
        </View>
        <Text style={styles.timerText}>{`00:${counter}`}</Text>
        {/* <TouchableOpacity
          disabled={!resendCode}
          activeOpacity={0.5}
          style={styles.resendBtn}
          onPress={handleResetCode}
        >
          <Text style={styles.resendText}>{t("resend")}</Text>
          <Image
            resizeMode="contain"
            source={ICONS.refershIcon}
            style={{
              ...styles.refershIcon,
              tintColor: resendCode ? Colors.primary : Colors.text,
            }}
          />
        </TouchableOpacity> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
