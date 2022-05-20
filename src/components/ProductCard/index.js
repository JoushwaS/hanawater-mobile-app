import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import { Text } from "..";
import { ICONS } from "../../assets/icons";
import { IMAGES } from "../../assets/images";
import metrix from "../../config/metrix";
import { styles } from "./styles";

function Index({
  buttonStyle = {},
  image = data?.item?.image,
  data = {},
  text = data?.item?.name,
  Textstyle = {},
  price = data?.item?.price,
  variations = data?.item?.variations,
  imageStyle = {},
  onPress = () => {},
}) {
  const TouchableProps = {
    activeOpacity: 0.5,
  };
  console.log("variationsss", data?.item?.image);
  return (
    <TouchableOpacity
      onPress={onPress}
      {...TouchableProps}
      style={styles.viewCon}
    >
      <ImageBackground
        source={data?.item?.image}
        imageStyle={styles.Catimg}
        style={styles.Catimg}
      >
        <TouchableOpacity {...TouchableProps} style={styles.circle}>
          <Image source={ICONS.heartfilled} style={styles.heartIcon} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.textPadding}>
        <Text style={styles.catText}>{text}</Text>
        <Text style={styles.catPrice}>{price}</Text>
        <FlatList
          data={data?.item?.variations}
          numColumns={3}
          style={{ marginTop: metrix.VerticalSize(10) }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={() => Math.random().toString()}
          renderItem={({ item, index }) => {
            return <Image source={item?.image} style={styles.varImg} />;
          }}
        ></FlatList>
      </View>
    </TouchableOpacity>
  );
}

export default Index;
