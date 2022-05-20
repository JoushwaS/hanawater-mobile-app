import React from "react";
import { StyleSheet, View, Image } from "react-native";
import styles from "./styles";
import { Text } from "../../components";
import FastImage from "../FastImage";
import { ICONS } from "../../assets/icons";

export default function Branches(props) {
  const { item } = props;

  return (
    <View style={styles.box}>
      <FastImage
        Imagestyle={styles.image}
        cover
        // style={styles.image}
        source={item?.image}
      />
      <View style={styles.rowpadding}>
        <View style={styles.rowContainer}>
          <Image source={ICONS.setlocation} style={styles.loc} />
          <Text style={styles.address}>{item?.address}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Image source={ICONS.callfill} style={styles.loc} />
          <Text style={styles.address}>{item?.contact}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Image source={ICONS.clock} style={styles.loc} />
          <View>
            <Text style={styles.time}>{item?.time1}</Text>
            <Text style={styles.time}>{item?.time2}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
