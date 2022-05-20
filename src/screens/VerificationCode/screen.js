import React, { Fragment, useRef, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text, TextInput, Button } from "../../components";
import Navigator from "../../navigation/root";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "../../config/theme";
import styles from "./style";
import { ICONS } from "../../assets/icons";
import metrix from "../../config/metrix";
import { SCREENS } from "../../config/constants/screens";

function Index(props) {
  const touchableProps = {
    activeOpacity: 0.5,
  };
  const code1Ref = useRef(null);
  const code2Ref = useRef(null);
  const code3Ref = useRef(null);
  const code4Ref = useRef(null);

  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");

  const onChange = (field_no, text) => {
    console.log("onChange==>", code2Ref);
    if (text.length > 0) {
      switch (field_no) {
        case 0: {
          setCode1(text);
          code2Ref.current.focus();
          return;
        }
        case 1: {
          code3Ref.current.focus();
          setCode2(text);
          return;
        }
        case 2: {
          code4Ref.current.focus();
          setCode3(text);
          return;
        }
        case 3: {
          setCode4(text);
          return;
        }
      }
    } else {
      switch (field_no) {
        case 0: {
          setCode1(text);
          return;
        }
        case 1: {
          setCode2(text);
          return;
        }
        case 2: {
          setCode3(text);
          return;
        }
        case 3: {
          setCode3(text);
          return;
        }
      }
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

  return (
    <KeyboardAwareScrollView style={styles.containerStyle}>
      <View style={styles.ContainerPadding}>
        <View style={{ alignItems: "center" }}>
          <Image source={ICONS.logopurple} style={styles.logo} />
          <Text style={styles.headingText}>Verification Code</Text>
          <Text style={styles.subText}>
            Please enter the OTP send to your Mobile Number
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.box}>
              <TextInput
                textInputStyle={styles.boxinput}
                // onChangeText={(text) => onChange(0, text)}
                ref={(ref) => (ref = code1Ref)}
                maxLength={1}
                selectTextOnFocus={true}
                value={code1}
                // onSubmitEditing={() => code2Ref.focus()}
                keyboardType="numeric"
                // onKeyPress={(e) => onKeyPress(0, e)}
                selectionColor={Colors.primary}
                inputProps={{}}
              />
            </View>
            <View
              style={[styles.box, { marginLeft: metrix.HorizontalSize(10) }]}
            >
              <TextInput
                textInputStyle={styles.boxinput}
                // onChangeText={(e) => onChange(1, e)}
                ref={(ref) => (ref = code2Ref)}
                maxLength={1}
                selectTextOnFocus={true}
                value={code2}
                keyboardType="numeric"
                // onKeyPress={(e) => onKeyPress(1, e)}
                // onSubmitEditing={() => code3Ref.focus()}
                selectionColor={Colors.primary}
              />
            </View>
            <View
              style={[styles.box, { marginLeft: metrix.HorizontalSize(10) }]}
            >
              <TextInput
                textInputStyle={styles.boxinput}
                // onChangeText={(e) => onChange(2, e)}
                value={(ref) => (ref = code3)}
                selectTextOnFocus={true}
                // onSubmitEditing={() => code4Ref.focus()}
                ref={(ref) => (ref = code3Ref)}
                maxLength={1}
                // onKeyPress={(e) => onKeyPress(2, e)}
                keyboardType="numeric"
                selectionColor={Colors.primary}
              />
            </View>
            <View
              style={[styles.box, { marginLeft: metrix.HorizontalSize(10) }]}
            >
              <TextInput
                textInputStyle={styles.boxinput}
                value={code4}
                // onChangeText={(e) => onChange(3, e)}
                ref={(ref) => (ref = code4Ref)}
                maxLength={1}
                selectTextOnFocus={true}
                // onKeyPress={(e) => onKeyPress(3, e)}
                keyboardType="numeric"
                selectionColor={Colors.primary}
              />
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <Button
            buttonStyle={styles.buttonStyle}
            onPress={() => Navigator.navigate(SCREENS.LOGIN_SCREEN)}
          >
            Send
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
