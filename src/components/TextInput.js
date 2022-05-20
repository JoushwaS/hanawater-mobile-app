import React, { useState } from "react";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import metrix from "../config/metrix";
import { Colors, Fonts } from "../config/theme";
import Text from "./Text";

function Index({
  isError = false,
  errorText = "Input Validation Failed",
  onChangeText = () => {},
  onChange = () => {},
  inputProps = {},
  textInputStyle = {},
  labelStyle = {},
  Viewstyle = {},
  secureTextEntry = false,
  placeholder = "",
  containLabel = false,
  maxLength = 32,
  label = "",
  keyboardType,
  ref,
  onKeyPress = () => {},
}) {
  const [showPassword, setPassword] = useState(true);
  // const onFocus = () => {
  //   ref.focus();
  // };
  return (
    <View>
      {containLabel && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={[styles.container, Viewstyle]}>
        <TextInput
          onChangeText={onChangeText}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ? showPassword : false}
          maxLength={maxLength}
          keyboardType={keyboardType}
          ref={(_ref) => (ref = _ref)}
          style={[styles.input, textInputStyle]}
          {...inputProps}
        />
        {isError && <Text style={styles.errorText}>{errorText}</Text>}
        {/* {secureTextEntry && (
          <Pressable
            onP
            onPressIn={() => setPassword(false)}
            onPressOut={() => setPassword(true)}
          >
            <Text style={styles.eyeButton}>X</Text>
          </Pressable>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: metrix.VerticalSize(55),
    alignItems: "center",
  },
  input: {
    paddingVertical: metrix.VerticalSize(14),
    paddingHorizontal: metrix.HorizontalSize(8),
    flex: 1,
    fontFamily: Fonts.IR,
    // position: "absolute",
    width: "100%",
    backgroundColor: Colors.textInputView,
    borderRadius: metrix.VerticalSize(5),
  },
  label: {
    color: Colors.text,
    marginLeft: metrix.HorizontalSize(2),
    fontFamily: Fonts.IM,
    marginBottom: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(15),
  },
  errorText: {
    color: Colors.Red,
  },
  eyeButton: {
    position: "absolute",
    right: metrix.HorizontalSize(4),
    top: metrix.VerticalSize(8),
  },
});

export default Index;
