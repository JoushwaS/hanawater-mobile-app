import React, { Fragment } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text, TextInput, Button } from "../../components";
import Navigation from "../../navigation/root";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./style";
import { ICONS } from "../../assets/icons";
import { SCREENS } from "../../config/constants/screens";

function Index(props) {
  const touchableProps = {
    activeOpacity: 0.5,
  };
  return (
    <KeyboardAwareScrollView style={styles.containerStyle}>
      <View style={styles.ContainerPadding}>
        <View style={{ alignItems: "center" }}>
          <Image source={ICONS.logopurple} style={styles.logo} />
          <Text style={styles.headingText}>Register Now</Text>
        </View>

        <TextInput
          placeholder="Enter Mobile Number"
          containLabel
          keyboardType="numeric"
          label="Mobile Number"
        />

        <View style={{ alignItems: "center" }}>
          <Button
            buttonStyle={styles.buttonStyle}
            onPress={() => Navigation.navigate(SCREENS.VERIFICATION_CODE)}
          >
            Register
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
