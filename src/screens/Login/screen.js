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
          <Text style={styles.headingText}>Login Below</Text>
        </View>

        <TextInput
          placeholder="Enter Mobile Number"
          containLabel
          keyboardType="numeric"
          label="Mobile Number"
        />
        <TextInput
          secureTextEntry
          placeholder="Enter Password"
          containLabel
          label="Password"
        />
        <TouchableOpacity
          style={{ alignItems: "flex-end" }}
          {...touchableProps}
          onPress={() => {
            Navigation.navigate(SCREENS.FORGOT_PASSWORD);
          }}
        >
          <Text style={styles.forgotPWText}>Forgot Password</Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Button buttonStyle={styles.buttonStyle}>Login</Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
