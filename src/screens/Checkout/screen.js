import React, { Fragment, useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { Text, TextInput, Button } from "../../components";
import { styles } from "./style";
import Navigation from "../../navigation/root";

import metrix from "../../config/metrix";
import OrderCompleted from "../OrderCompletedPopup/screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ICONS } from "../../assets/icons";
import { Colors } from "../../config/theme";
import { SCREENS } from "../../config/constants/screens";

function Index(props) {
  // const dispatch = useDispatch();

  const TouchableProps = {
    activeOpacity: 0.5,
    style: {
      paddingHorizontal: metrix.HorizontalSize(10),
      paddingVertical: metrix.VerticalSize(10),
    },
  };

  const paymentMethods = [
    {
      name: "Cash On Delivery",
    },
    {
      name: "Credit Card / Debit Card",
    },
    {
      name: "Bank Transfer",
    },
  ];

  const [activeindex, setActiveIndex] = useState(0);
  const [sameBilling, setsameBilling] = useState(false);
  const [terms, setTerms] = useState(false);

  const [shipping, setshippingAdded] = useState(false);
  const [billing, setbillingAdded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const renderPaymentmethods = () => {
    return paymentMethods.map((item, index) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => setActiveIndex(index)}
          >
            {activeindex == index && <View style={styles.innerCircle}></View>}
          </TouchableOpacity>
          <Text style={styles.paymentText}>{item?.name}</Text>
        </View>
      );
    });
  };

  const markAddressSame = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => setsameBilling(!sameBilling)}
        >
          <View
            style={[
              styles.checkBox,
              { borderColor: sameBilling ? Colors.primary : Colors.text },
            ]}
          >
            {sameBilling && (
              <Image source={ICONS.checked} style={styles.checkedIcon} />
            )}
          </View>
          <Text>Shipping & Billing address are same</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => setsameBilling(!sameBilling)}
        >
          <View
            style={[
              styles.checkBox,
              { borderColor: sameBilling ? Colors.primary : Colors.text },
            ]}
          >
            {terms && (
              <Image source={ICONS.checked} style={styles.checkedIcon} />
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>I have read and agree to the</Text>
            <TouchableOpacity>
              <Text style={styles.terms}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderShippingDetails = () => {
    return (
      <View style={styles.shippingViewContainer}>
        <Text style={styles.shipping}>Shipping Address</Text>
        {!shipping ? (
          <View>
            <TextInput placeholder="Enter Name" containLabel label="Name" />
            <TextInput
              placeholder="Enter Mobile Number"
              containLabel
              label="Mobile Number"
            />
            <TextInput
              placeholder="Enter Email Address"
              containLabel
              label="Email Address"
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.label}>Address</Text>
              <TouchableOpacity
                onPress={() => Navigation.navigate(SCREENS.MAP_ADDRESS)}
              >
                <Text style={styles.terms}>Select from the map</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Enter Address"
              multiline
              textInputStyle={styles.input}
              label="Address"
            />
            <TextInput placeholder="Enter City" containLabel label="City" />
            <TextInput
              placeholder="Enter Country"
              containLabel
              label="Country"
            />

            <View style={{ alignItems: "center" }}>
              {/* <Button
                onPress={() => setshippingAdded(true)}
                buttonStyle={styles.buttonStyle}
                variant="outlined"
              >
                Save
              </Button> */}
            </View>
          </View>
        ) : (
          shippingAdded()
        )}
      </View>
    );
  };
  const shippingAdded = () => {
    return (
      <View style={styles.shippingBox}>
        <View style={styles.rowContainerSpace}>
          <Text>Mohd Osama Tariq</Text>
          <Text>Karachi Pakistan</Text>
        </View>
        <View style={styles.rowContainerSpace}>
          <View style={styles.rowContainer}>
            <Image source={ICONS.call} style={styles.checkedIcon} />
            <Text style={styles.textStyle}>0321-8556252</Text>
          </View>
          <View style={styles.rowContainer}>
            <Image source={ICONS.mail} style={styles.checkedIcon} />
            <Text style={styles.textStyle}>mosama@gmail.com</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",

            justifyContent: "space-between",
          }}
        >
          <View style={styles.rowContainer}>
            <Image source={ICONS.location} style={styles.checkedIcon} />
            <Text style={styles.locationtextStyle}>
              Flat # 301, Grand Residency 1 2nd St, Bath Island, Karachi City,
              Sindh 75500, Pakistan
            </Text>
          </View>
          <Image source={ICONS.edit} style={styles.checkedIcon} />
        </View>
      </View>
    );
  };
  const billingAdded = () => {
    return (
      <View style={styles.shippingBox}>
        <View style={styles.rowContainerSpace}>
          <Text>Mohd Osama Tariq</Text>
          <Text>Karachi Pakistan</Text>
        </View>
        <View style={styles.rowContainerSpace}>
          <View style={styles.rowContainer}>
            <Image source={ICONS.call} style={styles.checkedIcon} />
            <Text style={styles.textStyle}>0321-8556252</Text>
          </View>
          <View style={styles.rowContainer}>
            <Image source={ICONS.mail} style={styles.checkedIcon} />
            <Text style={styles.textStyle}>mosama@gmail.com</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",

            justifyContent: "space-between",
          }}
        >
          <View style={styles.rowContainer}>
            <Image source={ICONS.location} style={styles.checkedIcon} />
            <Text style={styles.locationtextStyle}>
              Flat # 301, Grand Residency 1 2nd St, Bath Island, Karachi City,
              Sindh 75500, Pakistan
            </Text>
          </View>
          <Image source={ICONS.edit} style={styles.checkedIcon} />
        </View>
      </View>
    );
  };
  const renderBillingDetails = () => {
    return (
      <View style={styles.shippingViewContainer}>
        <Text style={styles.shipping}>Billing Address</Text>
        {!billing ? (
          <View>
            <TextInput placeholder="Enter Name" containLabel label="Name" />
            <TextInput
              placeholder="Enter Mobile Number"
              containLabel
              label="Mobile Number"
            />
            <TextInput
              placeholder="Enter Email Address"
              containLabel
              label="Email Address"
            />
            <TextInput
              placeholder="Enter Address"
              multiline
              containLabel
              textInputStyle={styles.input}
              label="Address"
            />
            <TextInput placeholder="Enter City" containLabel label="City" />
            <TextInput
              placeholder="Enter Country"
              containLabel
              label="Country"
            />

            <View style={{ alignItems: "center" }}>
              {/* <Button
                onPress={() => setbillingAdded(true)}
                buttonStyle={styles.buttonStyle}
                variant="outlined"
              >
                Save
              </Button> */}
            </View>
          </View>
        ) : (
          billingAdded()
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <OrderCompleted
        modalVisible={filterVisible}
        setModalVisible={setFilterVisible}
        moveToShopping={() => Navigation.navigate(SCREENS.HOME_SCREEN)}
      />

      <KeyboardAwareScrollView>
        <View style={styles.ContainerPadding}>
          <Text style={styles.headingText}>Check Out</Text>
          {renderPaymentmethods()}
          {renderShippingDetails()}
          {/* {shippingAdded()} */}

          {markAddressSame()}
          {sameBilling && renderBillingDetails()}
          <View style={{ alignItems: "center" }}>
            <Button
              onPress={() => Navigation.navigate(SCREENS.BILLING_ADDED)}
              buttonStyle={styles.buttonStyle}
              variant="filled"
            >
              Proceed
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default Index;
