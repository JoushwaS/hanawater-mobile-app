import React, { useState } from "react";
import {
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import { ICONS } from "../../assets/icons";
import styles from "./styles";
import Text from "../Text";
import IconButton from "../IconButton";
import { IMAGES } from "../../assets/images";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";
import { Button } from "..";

export default function Index({
  modalVisible,
  setModalVisible,
  viewRef,
  setActiveFilters,
  activeFilters,
}) {
  const [price, setPrice] = useState(0);
  const [availableColors, setAvailableColors] = useState([
    "pink",
    "red",
    "green",
    "blue",
    "lime",
    "brown",
    "black",
    "grey",
    "lightblue",
    "aqua",
    "yellow",
  ]);
  const [isSortOpen, setSortOpen] = useState(false);
  const [sortOptions, setSortOptions] = useState([
    "Price : Low to High",
    "Price : High to Low",
  ]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSortPress = () => {
    setSortOpen(!isSortOpen);
  };

  const onSortPress = (sortOrder) => {
    setActiveFilters({
      ...activeFilters,
      sortOrder,
    });
    setSortOpen(false);
  };

  const onCategoryPress = (category) => {
    const categories = new Set([...activeFilters.categories]);
    if (categories.has(category)) {
      categories.delete(category);
    } else {
      categories.add(category);
    }
    setActiveFilters({
      ...activeFilters,
      categories: [...categories],
    });
  };

  const handleColorPress = (color) => {
    const colors = new Set([...activeFilters.colors]);
    if (colors.has(color)) {
      colors.delete(color);
    } else {
      colors.add(color);
    }
    setActiveFilters({
      ...activeFilters,
      colors: [...colors],
    });
  };

  const touchableProps = {
    activeOpacity: 0.5,
  };

  const categoryButton = (text) => {
    return {
      backgroundColor: activeFilters?.categories?.includes(text)
        ? Colors.primary
        : null,
      borderColor: activeFilters?.categories?.includes(text)
        ? Colors.primary
        : null,
    };
  };

  const categoryText = (text) => {
    return {
      color: activeFilters?.categories?.includes(text) ? Colors.White : null,
    };
  };

  const onApplyFilter = () => {
    setActiveFilters({
      ...activeFilters,
      price: price.toFixed(0),
    });
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeModal}
        style={styles.modalView}
      >
        <TouchableHighlight onPress={closeModal}>
          <View style={styles.filterView}>
            <View style={styles.headerRow}>
              <Text style={{ fontWeight: "bold" }}>Filters</Text>
              <IconButton
                style={styles.closeIcon}
                icon={IMAGES.closeIcon}
                onPress={() => setModalVisible(false)}
              />
            </View>

            <Text style={styles.heading}>Price range</Text>
            <View style={styles.priceRow}>
              <Text>Rs. 0</Text>
              {price > 0 && <Text>{`Rs. ${price.toFixed(0)}`}</Text>}
            </View>

            <Text style={styles.heading}>Colors</Text>
            <FlatList
              data={availableColors}
              numColumns={5}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={() => Math.random().toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  {...touchableProps}
                  key={index.toString()}
                  style={{
                    ...styles.border,
                    borderColor: activeFilters.colors.includes(item)
                      ? Colors.primary
                      : Colors.White,
                  }}
                  onPress={() => handleColorPress(item)}
                >
                  <View
                    style={{ ...styles.colorIcon, backgroundColor: item }}
                  ></View>
                </TouchableOpacity>
              )}
            ></FlatList>

            <Text style={styles.heading}>Category</Text>
            <View style={styles.categoryRow}>
              <TouchableOpacity
                onPress={() => onCategoryPress("All")}
                {...touchableProps}
                style={{
                  ...styles.categoryButton,
                  ...categoryButton("All"),
                }}
              >
                <Text
                  style={{
                    ...categoryText("All"),
                  }}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onCategoryPress("Women")}
                {...touchableProps}
                style={{
                  ...styles.categoryButton,
                  ...categoryButton("Women"),
                }}
              >
                <Text
                  style={{
                    ...categoryText("Women"),
                  }}
                >
                  Women
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onCategoryPress("Men")}
                {...touchableProps}
                style={{
                  ...styles.categoryButton,
                  ...categoryButton("Men"),
                }}
              >
                <Text
                  style={{
                    ...categoryText("Men"),
                  }}
                >
                  Men
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
              <TouchableOpacity
                onPress={() => onCategoryPress("Boys")}
                {...touchableProps}
                style={{
                  ...styles.categoryButton,
                  ...categoryButton("Boys"),
                }}
              >
                <Text
                  style={{
                    ...categoryText("Boys"),
                  }}
                >
                  Boys
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onCategoryPress("Office")}
                {...touchableProps}
                style={{
                  ...styles.categoryButton,
                  ...categoryButton("Office"),
                }}
              >
                <Text
                  style={{
                    ...categoryText("Office"),
                  }}
                >
                  Office
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onCategoryPress("Travel")}
                {...touchableProps}
                style={{
                  ...styles.categoryButton,
                  ...categoryButton("Travel"),
                }}
              >
                <Text
                  style={{
                    ...categoryText("Travel"),
                  }}
                >
                  Travel
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
              <TouchableOpacity
                onPress={() => onCategoryPress("Gifts")}
                {...touchableProps}
                style={{
                  ...styles.categoryButton,
                  ...categoryButton("Gifts"),
                }}
              >
                <Text
                  style={{
                    ...categoryText("Gifts"),
                  }}
                >
                  Gifts
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.heading}>Sort by</Text>
            <TouchableOpacity
              onPress={handleSortPress}
              {...touchableProps}
              style={styles.sortView}
            >
              <Text>
                {activeFilters.sortOrder
                  ? activeFilters.sortOrder
                  : "Select Sort Option"}
              </Text>
              <Image
                resizeMode="contain"
                style={styles.arrowDown}
                source={ICONS.arrowDown}
              />
            </TouchableOpacity>
            {isSortOpen && (
              <View style={styles.sortOptions}>
                {sortOptions.map((text, i) => (
                  <TouchableOpacity
                    style={{
                      ...styles.sortOption,
                      backgroundColor:
                        activeFilters.sortOrder === text
                          ? Colors.primary
                          : null,
                    }}
                    onPress={() => onSortPress(text)}
                    {...touchableProps}
                    key={i.toString()}
                  >
                    <Text
                      style={{
                        color:
                          activeFilters.sortOrder === text
                            ? Colors.White
                            : Colors.Black,
                      }}
                    >
                      {text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <Button
              onPress={onApplyFilter}
              buttonStyle={styles.buttonStyle}
              variant="filled"
            >
              Apply
            </Button>
          </View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
}
