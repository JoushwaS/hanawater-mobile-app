import React, { Fragment, useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { Text, Button } from "../../components";
import { showToast } from "../../utils";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";
import Navigation from "../../navigation/root";
import { Fonts } from "../../config/theme";

function Index(props) {
  // const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [activeColorIndex, setActiveColor] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const TouchableProps = {
    activeOpacity: 0.5,
    style: {
      paddingHorizontal: metrix.HorizontalSize(10),
      paddingVertical: metrix.VerticalSize(10),
    },
  };

  const availableColors = [
    { name: "Black", colorCode: "black" },
    { name: "Pink", colorCode: "pink" },
    { name: "Green", colorCode: "green" },
    { name: "Yellow", colorCode: "yellow" },
  ];

  const handleColorChange = (type) => {
    switch (type) {
      case "right":
        const rightIndex = activeColorIndex + 1;
        if (rightIndex === availableColors.length) {
          setActiveColor(0);
        } else setActiveColor(rightIndex);
        break;
      case "left":
        const leftIndex = activeColorIndex - 1;
        if (leftIndex < 0) {
          setActiveColor(availableColors.length - 1);
        } else setActiveColor(leftIndex);
        break;
      default:
        break;
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.headingText}>Print My Name</Text>
      <View style={{ alignItems: "center" }}>
        <View style={styles.tab}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              {...TouchableProps}
              onPress={() => setActiveTabIndex(0)}
              style={[
                styles.selectedTab,
                {
                  backgroundColor: activeTabIndex == 0 ? "#E0E0FC" : "white",
                  borderRadius:
                    activeTabIndex == 0 ? metrix.HorizontalSize(10) : 0,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.tabText,
                  {
                    color: activeTabIndex == 0 ? "#6366F1" : "#414141",
                    fontFamily: activeTabIndex == 0 ? Fonts.IS : Fonts.IM,
                  },
                ]}
              >
                Continental Wallet
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTabIndex(1)}
              {...TouchableProps}
              style={[
                styles.selectedTab,
                {
                  backgroundColor: activeTabIndex == 1 ? "#E0E0FC" : "white",
                  borderRadius:
                    activeTabIndex == 1 ? metrix.HorizontalSize(10) : 0,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.tabText,
                  {
                    color: activeTabIndex == 1 ? "#6366F1" : "#414141",
                    fontFamily: activeTabIndex == 1 ? Fonts.IS : Fonts.IM,
                  },
                ]}
              >
                Bi fold wallet
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTabIndex(2)}
              {...TouchableProps}
              style={[
                styles.selectedTab,
                {
                  backgroundColor: activeTabIndex == 2 ? "#E0E0FC" : "white",
                  borderRadius:
                    activeTabIndex == 2 ? metrix.HorizontalSize(10) : 0,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.tabText,
                  {
                    color: activeTabIndex == 2 ? "#6366F1" : "#414141",
                    fontFamily: activeTabIndex == 2 ? Fonts.IS : Fonts.IM,
                  },
                ]}
              >
                Key Fob
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <Image
          resizeMode="contain"
          style={styles.coverImage}
          source={IMAGES.printName}
        />
        <Text
          style={{
            ...styles.printName,
            color: availableColors[activeColorIndex].colorCode,
          }}
        >
          {name}
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.firstColumn}>
          <Text style={styles.font}>Text</Text>
          <TextInput
            maxLength={15}
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text.trimLeft())}
          />
        </View>
        <View style={styles.secondColumn}>
          <Text style={styles.font}>Font</Text>
          <View style={styles.box}>
            <TouchableOpacity {...TouchableProps}>
              <Image style={styles.arrowIcon} source={IMAGES.arrowLeft} />
            </TouchableOpacity>
            <Text>Arial</Text>
            <TouchableOpacity {...TouchableProps}>
              <Image style={styles.arrowIcon} source={IMAGES.arrowRight} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.firstColumn}>
          <Text style={styles.font}>Color</Text>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => handleColorChange("left")}
              {...TouchableProps}
            >
              <Image style={styles.arrowIcon} source={IMAGES.arrowLeft} />
            </TouchableOpacity>
            <Text>{availableColors[activeColorIndex].name}</Text>
            <TouchableOpacity
              onPress={() => handleColorChange("right")}
              {...TouchableProps}
            >
              <Image style={styles.arrowIcon} source={IMAGES.arrowRight} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.secondColumn}>
          <Text style={styles.font}>Placement</Text>
          <View style={styles.box}>
            <TouchableOpacity {...TouchableProps}>
              <Image style={styles.arrowIcon} source={IMAGES.arrowLeft} />
            </TouchableOpacity>
            <Text>Front</Text>
            <TouchableOpacity {...TouchableProps}>
              <Image style={styles.arrowIcon} source={IMAGES.arrowRight} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Button
          onPress={() => Navigation.goBack()}
          buttonStyle={styles.buttonStyle}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button buttonStyle={styles.buttonStyle} variant="filled">
          Submit
        </Button>
      </View>
    </ScrollView>
  );
}

export default Index;
