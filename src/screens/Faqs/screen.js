import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
} from "react-native";
import { Text } from "../../components";
import { useDispatch } from "react-redux";
import { styles } from "./style";
import { ICONS } from "../../assets/icons";

function Index(props) {
  const dispatch = useDispatch();

  const [activeindex, setactiveIndex] = useState(-1);

  const faqs = [
    {
      title: "How do I place an order?",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title: "What are the delivery time and charges?",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title: "What about Tariff & Taxes?",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title: "Which Payment Methods are available on Mjafferjees.com",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title: "How do I make a complaint?",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title: "Pick Up in Store",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title: "How do I change or Cancel my order?",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title: "How do I track my order?",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title: "Does the actual product vary from what is seen on the website?",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title: "What personalization does MJ offer?",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title:
        "Does MJ Offer volume discounts and/or create Dye for Corporate Logos?",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
    {
      title: "What happens when an item is out of stock?",
      description: `Currently we are only Delivering within Pakistan. We will be offering International deliveries very soon.\n \nWe are offering FREE DELIVERY (within Pakistan) for Orders above Rs. 2,500. For orders up-to Rs. 2,500 a flat rate of Rs. 100 will be applied for Deliveries in Karachi and Rs. 150 for Deliveries within Pakistan.\n \nDepending on the availability of the product(s) you are Ordering, it might take 5 to 10 working days to dispatch your Order for regular quantities. We also accept Bulk Orders, please visit our Corporate Inquiries page to learn more about our Services. If you have opted for Pick-up from Store, your Ordered Product(s) will be available at your selected store within 5 to 10 working days and you shall be notified accordingly.`,
    },
  ];

  return (
    <ScrollView>
      <View style={styles.Viewcontainer}>
        <Text style={styles.headingText}>Frequently Asked Questions</Text>
        {faqs.map((item, index) => {
          return (
            <View style={styles.contentPadding}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  if (index == activeindex) {
                    setactiveIndex(-1);
                  } else {
                    setactiveIndex(index);
                  }
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.title}>{item?.title}</Text>
                  <Image
                    source={
                      activeindex == index
                        ? ICONS.downarrowgrey
                        : ICONS.rightarrowgrey
                    }
                    style={styles.arrow}
                  />
                </View>
              </TouchableOpacity>
              {activeindex == index && (
                <Text style={styles.faqsDetails}>{item?.description}</Text>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default Index;
