import React, { Fragment, useMemo } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { Text, TextInput, Button } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { styles } from "./style";
import { ICONS } from "../../assets/icons";
import metrix from "../../config/metrix";

function Index(props) {
  const dispatch = useDispatch();

  return useMemo(() => {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.contentPadding}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.headingText}>Contact Us</Text>
            <Text>Get In Touch With Us</Text>
          </View>
          <TextInput placeholder="Enter Name" containLabel label="Full Name" />
          <TextInput
            placeholder="Enter Email Address"
            containLabel
            label="Email Address"
          />
          <TextInput
            placeholder="Enter Mobile Number"
            containLabel
            label="Mobile Number"
          />
          <TextInput
            placeholder="Enter Message"
            containLabel
            Viewstyle={styles.textContainer}
            textInputStyle={styles.textArea}
            label="Message"
            multiline={true}
          />
          <View
            style={{
              alignItems: "center",
              paddingBottom: metrix.VerticalSize(80),
            }}
          >
            <Button buttonStyle={styles.buttonStyle}>Save</Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }, [props]);
}

export default Index;
