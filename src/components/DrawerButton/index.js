import React, { useState } from "react";
import Animated, { acc } from "react-native-reanimated";
import { useDrawerProgress } from "@react-navigation/drawer";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Text } from "..";
import { ICONS } from "../../assets/icons";

// const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const touchableProps = {
  activeOpacity: 0.5,
};

const renderChildren = (item) => {
  item?.children.map((_item) => (
    <TouchableOpacity
      {...touchableProps}
      onPress={() => props.onPress(item?.routeName)}
      style={
        [
          // styles.container,
          // animatedStyles
        ]
      }
    >
      {/* <View style={styles.drawerItemheight}> */}
      <View style={styles.rowContainer}>
        <Text style={styles.drawerText}>{_item.name}</Text>
      </View>
      {/* </View> */}
    </TouchableOpacity>
  ));
};

const DrawerButton = ({ index, item, ...props }) => {
  // const progress = useDrawerProgress();
  // console.log('progress', progress);

  // const translateX = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [-40 * vw * (index + 1), 0],
  // });
  // const animatedStyles = {
  //   transform: [{translateX}],
  // };
  const [help, openHelp] = useState(false);
  const [categories, opencategories] = useState(false);
  const [about, showAbout] = useState(false);
  const [account, showAccount] = useState(false);

  const renderChildren = (item) => {
    if (item?.name == "Help" && help == true) {
      return item?.children.map((_item, index) => (
        <TouchableOpacity
          key={index.toString()}
          {...touchableProps}
          onPress={() => props.onPress(_item?.routeName)}
          style={[styles.container]}
        >
          <View style={styles.drawerItemheight}>
            <View style={styles.rowContainer}>
              <Text style={[styles.drawerText, { opacity: 0.7 }]}>
                {_item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    } else if (item?.name == "Categories" && categories == true) {
      return item?.children.map((_item) => (
        <TouchableOpacity
          key={index.toString()}
          {...touchableProps}
          onPress={() => props.onPress(_item?.routeName)}
          style={[styles.container]}
        >
          <View style={styles.drawerItemheight}>
            <View style={styles.rowContainer}>
              <Text style={[styles.drawerText, { opacity: 0.7 }]}>
                {_item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    } else if (item?.name == "About" && about == true) {
      return item?.children.map((_item) => (
        <TouchableOpacity
          key={index.toString()}
          {...touchableProps}
          onPress={() => props.onPress(_item?.routeName)}
          style={[styles.container]}
        >
          <View style={styles.drawerItemheight}>
            <View style={styles.rowContainer}>
              <Text style={[styles.drawerText, { opacity: 0.7 }]}>
                {_item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    } else if (item?.name == "My Account" && account == true) {
      return item?.children.map((_item) => (
        <TouchableOpacity
          key={index.toString()}
          {...touchableProps}
          onPress={() => props.onPress(_item?.routeName)}
          style={[styles.container]}
        >
          <View style={styles.drawerItemheight}>
            <View style={styles.rowContainer}>
              <Text style={[styles.drawerText, { opacity: 0.7 }]}>
                {_item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ));
    }
  };

  return (
    <TouchableOpacity
      {...touchableProps}
      onPress={() => {
        if (
          item?.name !== "Customer Care" &&
          item?.name !== "Help" &&
          item?.name !== "Categories" &&
          item?.name !== "About" &&
          item?.name !== "My Account"
        ) {
          props.onPress(item?.routeName, true);
        } else if (item?.name == "Help") {
          openHelp(!help);
        } else if (item?.name == "Categories") {
          opencategories(!categories);
        } else if (item?.name == "About") {
          showAbout(!about);
        } else if (item?.name == "My Account") {
          showAccount(!account);
        }
      }}
      style={[
        styles.container,

        // animatedStyles
      ]}
    >
      <View style={styles.drawerItemheight}>
        <View style={styles.rowContainer}>
          <Image
            source={item?.icon}
            resizeMode="contain"
            style={styles.iconImg}
          />
          <Text style={styles.drawerText}>{item?.name}</Text>
        </View>
        {(item?.name == "Customer Care" ||
          item?.name == "Help" ||
          item?.name == "Categories" ||
          item?.name == "About" ||
          item?.name == "My Account") && (
          <Image source={ICONS.downarrow} style={styles.downarrowImg} />
        )}
        {/* {item?.name == "Support" && renderChildren(item)} */}
      </View>
      {renderChildren(item)}
    </TouchableOpacity>
  );
};

export default DrawerButton;
