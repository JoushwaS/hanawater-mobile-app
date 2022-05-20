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
        <Text style={styles.headingText}>Terms & Conditions</Text>
        <View style={styles.contentPadding}>
          <Text style={styles.subscribeText}>
            M Jafferjees is a partnership company registered in Karachi,
            Pakistan (referred to in this statement as "we", "us", "MJ",
            "mjafferjees" and "our") The following Terms and Conditions
            (“Terms”, “Terms of Use”) and any other policy related document set
            out apply to our website www.mjafferjees.com and all other platforms
            that are owned and operated by M Jafferjees. The followings Terms
            can and may be amended from time to time. We at MJ reserve the right
            to modify and update these Terms. Any purchase outside these sales
            outlets will be at the purchaser’s own risk, especially concerning
            the authenticity of the said products. The information on this
            website has been compiled by M Jafferjees from given internal and
            external sources. We strive to ensure that the information posted on
            all our platforms are accurate and complete. However, we do not
            guarantee that the content or information that is available is
            accurate and/or error free. Our website and other digital platforms
            may contain typographical errors, functionality issues, price
            differences and color variations. M Jafferjees makes no commitment
            to correct or update this information. We do not hold ourselves
            responsible regarding any content of any other website which you may
            access from this website. When you access another website please
            note and understand that it is independent from us and we hold no
            control over the given content of the other website. Third party
            links to this website do not constitute, and should not be
            interpreted, in any way, as an endorsement by M Jafferjees of such
            websites. You agree to indemnify and hold us, and each of our
            subsidiaries and affiliates, partners, employees, harmless from any
            loss, liability, claim, or demand, damages, costs and expenses,
            including but not limited to attorney’s fees, arising from or
            related to the use of this website and the services or from reliance
            upon any given information contained in this website. By accessing
            any one of our outlets, website or digital media sites you agree to
            the following Terms that are mentioned. Therefore, it is our humble
            advice that you read these Terms carefully. If you do not agree with
            any of the following Terms mentioned, we recommend that you stop
            using all our platforms immediately. If you have any questions or
            complaints about any products that you have purchased from any one
            of our given platforms, you can contact us at assist@mjafferjees.com
            The Website and the whole of its content and other components
            notably including the MJ logo
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Index;
