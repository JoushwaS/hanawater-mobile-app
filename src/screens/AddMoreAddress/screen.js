import React, { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text } from "../../components";
import Navigator from "../../navigation/root";
import CustomInput from "../../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { styles } from "./style";
import { ICONS } from "../../assets/icons";

function Index(props) {
  const address = [
    {
      name: "Mohd Osama Tariq",
      phone: "0321-8556252",
      address:
        "Flat # 301, Grand Residency 1 2nd St, Bath Island, Karachi City, Sindh 75500, Pakistan",
    },
    {
      name: "Mohd Osama Tariq",
      phone: "0321-8556252",

      address:
        "Flat # 301, Grand Residency 1 2nd St, Bath Island, Karachi City, Sindh 75500, Pakistan",
    },
    {
      name: "Mohd Osama Tariq",
      phone: "0321-8556252",

      address:
        "Flat # 301, Grand Residency 1 2nd St, Bath Island, Karachi City, Sindh 75500, Pakistan",
    },
    {
      name: "Mohd Osama Tariq",
      phone: "0321-8556252",

      address:
        "Flat # 301, Grand Residency 1 2nd St, Bath Island, Karachi City, Sindh 75500, Pakistan",
    },
    {
      name: "Mohd Osama Tariq",
      phone: "0321-8556252",

      address:
        "Flat # 301, Grand Residency 1 2nd St, Bath Island, Karachi City, Sindh 75500, Pakistan",
    },
  ];
  const [activeindex, setActiveIndex] = useState(0);

  const renderAddressList = () => {
    return address.map((item, index) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => setActiveIndex(index)}
          >
            {activeindex == index && <View style={styles.innerCircle}></View>}
          </TouchableOpacity>
          <View style={styles.shippingBox}>
            <View style={styles.rowContainerSpace}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.rowContainer}>
                <TouchableOpacity>
                  <Image source={ICONS.edit} style={styles.checkedIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={ICONS.delete} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Image source={ICONS.call} style={styles.checkedIcon} />
              <Text style={styles.textStyle}>{item.phone}</Text>
            </View>
            <View style={styles.topContainer}>
              <View style={styles.rowContainer}>
                <Image source={ICONS.location} style={styles.checkedIcon} />
                <Text style={styles.locationtextStyle}>{item.address}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.ContainerPadding}>
        <Text style={styles.headingText}>Addressess</Text>
        <CustomInput
          icon={ICONS.search}
          placeholder="Search"
          inputContainerStyle={styles.inputView}
        />
        {renderAddressList()}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
