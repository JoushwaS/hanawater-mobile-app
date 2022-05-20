import React, { Fragment, useMemo, useState, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  View,
} from "react-native";
import { Text, Button } from "../../components";
import { useDispatch } from "react-redux";
import { IMAGES } from "../../assets/images";
import { styles } from "./style";
import metrix from "../../config/metrix";

function Index(props) {
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.Viewcontainer}>
        <Text style={styles.headingText}>Privacy Policy</Text>
        <View style={styles.contentPadding}>
          <Text style={styles.subscribeText}>
            M Jafferjees is a partnership company registered in Karachi,
            Pakistan (referred to in this statement as "we", "us", "MJ",
            "mjafferjees" and "our") Welcome to our website mjafferjees.com (the
            "website"). This privacy policy applies when you visit, surf,
            register on the website and/or when you use our services for
            purchasing products. By accessing this website, you accept the
            practices that are described in this Privacy Policy. We at MJ take
            your privacy very seriously. The following page will allow you to
            learn more about what personal information we collect across our
            website, mobile sites and any other given application that is
            online, and in our stores; how and when data is collected, what we
            use it for and also details of the circumstances in which we may
            disclose this information to third parties.
          </Text>
          <Text style={styles.subheadingText}>Personal Data</Text>
          <Text style={styles.subscribeText}>
            When you register for an account with us, purchase a product online,
            place an order, have interaction with our digital content on your
            computer or mobile devices or send us an enquiry, we will be
            required to collect certain personal information from you (name,
            email address, home address, credit card numbers, telephone numbers
            etc.) in order for authentication or an identity check (standard
            fraud checks) to take place. our data will be held and managed by us
            and at all times we seek to comply with the requirements of any
            applicable data protection laws and regulations to ensure that the
            personal information you provide is kept secure.
          </Text>
          <Text style={styles.subheadingText}>Use of information</Text>
          <Text style={styles.subscribeText}>
            According to our preferences, we may use your personal data in order
            to analyze how you use our website and in-store services. This will
            help us to further personalize our communications and improve our
            in-store services for you. If you have consented to our Privacy
            Policy, we will use the information to keep you informed about our
            products, events, promotions, changes to our privacy policy and
            terms and conditions via e-mail, mobile messaging, telephone
            communication and/or through other electronic or digital means
            including our social media platforms. At any time, you can tell us
            that you do not want us to use your details for the purpose of
            marketing (as mentioned above) by writing to us (see contact
            details). Access to our Customer Database is allowed exclusively to
            authorized staff of MJ, mainly the staff that is in charge of
            Marketing, Digital and Information System departments who are
            responsible to maintain and, analyze data and execute all marketing
            strategies. The personal information provided will not be shared or
            passed on to third parties for direct marketing purposes or The
            information you provide is kept strictly confidential. In certain
            circumstances we may disclose personal information relating to you
            to a third party, for example, in order to conform to any
            requirements of law, to comply with any legal process, for the
            purposes of credit risk reduction, to prevent and detect fraud
            and/or to protect and defend that rights and property of M
            Jafferjees.
          </Text>
          <Text style={styles.subheadingText}>Security Statement</Text>
          <Text style={styles.subscribeText}>
            Unfortunately, transmission of information online is not completely
            secure. We have adopted security measures to protect your personal
            data against accidental loss, alteration and unauthorized disclosure
            wherever possible. All Personal information provided to MJ are
            transmitted through a secure server using Secure Socket Layering
            (SSL), encryption technology which is used to protect your
            information. SSL encrypts all information, such as your name,
            address and credit card numbers that is provided to us while placing
            an order. Our Website also functions and operate on private, secure
            servers to ensure maximum security. We at MJ recommend that you use
            browsers that are SSL enabled which include Internet Explorer,
            Chrome, Safari, and/or Firefox.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Index;
