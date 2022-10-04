import React, { useState, useRef, useImperativeHandle } from "react";
import { TextInput, View, StyleSheet, Image, Touchable } from "react-native";
import { ICONS } from "../assets/icons";
import { IMAGES } from "../assets/images";
import metrix from "../config/metrix";
import { Colors, Fonts } from "../config/theme";
import Text from "./Text";

const Input = React.forwardRef(
  (
    {
      isError = false,
      auth,
      errorText = "Input Validation Failed",
      onChangeText = () => {},
      onChange = () => {},
      inputProps = {},
      textInputStyle = {},
      labelStyle = {},
      viewStyle = {},
      secureTextEntry = false,
      placeholder = "",
      containLabel = false,
      maxLength = 50,
      label = "",
      keyboardType,
      isDropDown = false,
      onKeyPress = () => {},
      style = {},
      numberOfLines = 1,
      disabled = false,
      value = "",
      isDob = false,
    },
    ref
  ) => {
    const [showPassword, setPassword] = useState(true);
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }));

    return (
      <View style={style}>
        {containLabel && (
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        )}
        <View style={[styles.container, viewStyle]}>
          {auth ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: metrix.HorizontalSize(10),
              }}
            >
              {auth && <Text style={styles.inputText}>+966</Text>}
              <TextInput
                value={value}
                editable={!disabled}
                onChangeText={onChangeText}
                onChange={onChange}
                placeholder={placeholder}
                onKeyPress={onKeyPress}
                secureTextEntry={secureTextEntry ? showPassword : false}
                maxLength={maxLength}
                keyboardType={keyboardType}
                ref={inputRef}
                style={[styles.input, textInputStyle]}
                numberOfLines={numberOfLines}
                placeholderTextColor={Colors.text}
                {...inputProps}
              />
            </View>
          ) : (
            <TextInput
              value={value}
              editable={!disabled}
              onChangeText={onChangeText}
              onChange={onChange}
              placeholder={placeholder}
              onKeyPress={onKeyPress}
              secureTextEntry={secureTextEntry ? showPassword : false}
              maxLength={maxLength}
              keyboardType={keyboardType}
              ref={inputRef}
              style={[styles.input, textInputStyle]}
              numberOfLines={numberOfLines}
              placeholderTextColor={Colors.text}
              {...inputProps}
            />
          )}
          {isError && <Text style={styles.errorText}>{errorText}</Text>}
          {isDropDown && (
            <Image
              resizeMode="contain"
              style={styles.arrow}
              source={IMAGES.arrowRight}
            ></Image>
          )}
          {isDob && (
            <Image
              resizeMode="contain"
              style={styles.dob}
              source={ICONS.calender}
            ></Image>
          )}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.inputBG,
    borderRadius: metrix.VerticalSize(5),
  },
  arrow: {
    // backgroundColor: "red",
    position: "absolute",
    width: metrix.VerticalSize(15),
    height: metrix.VerticalSize(15),
    top: metrix.VerticalSize(15),
    right: metrix.HorizontalSize(15),
    transform: [{ rotate: "90deg" }],
    paddingVertical: metrix.VerticalSize(10),
    paddingHorizontal: metrix.HorizontalSize(10),
  },
  dob: {
    position: "absolute",
    width: metrix.VerticalSize(18),
    height: metrix.VerticalSize(18),
    top: metrix.VerticalSize(11),
    right: metrix.HorizontalSize(15),
    padding: 10,
  },
  inputText: {
    fontFamily: Fonts.IR,
    // color: Colors.text,
    fontSize: metrix.CustomFontSize(23),
  },
  input: {
    paddingVertical: metrix.VerticalSize(0),
    paddingHorizontal: metrix.HorizontalSize(15),
    height: metrix.VerticalSize(50),
    flex: 1,
    fontFamily: Fonts.IR,
    width: "100%",
    backgroundColor: Colors.inputBG,
    borderRadius: metrix.VerticalSize(5),
    fontSize: metrix.CustomFontSize(23),
  },
  label: {
    color: Colors.text,
    marginLeft: metrix.HorizontalSize(2),
    fontFamily: Fonts.IM,
    marginBottom: metrix.VerticalSize(10),
    fontSize: metrix.CustomFontSize(19),
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

export default Input;
