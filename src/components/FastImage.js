import React, { useState, Fragment } from "react";
import { ActivityIndicator, View } from "react-native";
import FastImage from "react-native-fast-image";
import { IMAGES } from "../assets/images";
import { Colors } from "../config/theme";

export default function CustomFastImage({
  source,
  cover,
  stretch,
  Imagestyle,
}) {
  const [isLoading, setIsLoading] = useState(true);

  const renderImage = (source) => {
    if (source.uri === null || source.uri === "") {
      return IMAGES.Imgplaceholder;
    } else {
      return source;
    }
  };
  return (
    <Fragment>
      <FastImage
        style={Imagestyle}
        resizeMode={
          cover
            ? FastImage.resizeMode.cover
            : stretch
            ? FastImage.resizeMode.stretch
            : FastImage.resizeMode.contain
        }
        source={renderImage(source)}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
      >
        {isLoading && (
          <View>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}
      </FastImage>
    </Fragment>
  );
}
