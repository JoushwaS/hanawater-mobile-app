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
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.contentPadding}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.headingText}>User Profile</Text>

              <ImageBackground
                source={ICONS.profilegrey}
                imageStyle={styles.profileicon}
                style={styles.profileicon}
              >
                <View style={styles.circle}>
                  <Image source={ICONS.edit} style={styles.editicon} />
                </View>
              </ImageBackground>
            </View>
            <TextInput
              placeholder="Enter Name"
              containLabel
              label="Full Name"
            />
            <TextInput
              placeholder="Enter Email Address"
              containLabel
              label="Email Address"
            />
            <TextInput placeholder="Male" containLabel label="Gender" />
            <TextInput
              placeholder="Enter Mobile Number"
              containLabel
              label="Mobile Number"
            />
            <TextInput
              placeholder="Enter Country"
              containLabel
              label="Country"
            />
            <TextInput placeholder="Enter City" containLabel label="City" />

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
      </View>
    );
  }, [props]);
}

export default Index;
