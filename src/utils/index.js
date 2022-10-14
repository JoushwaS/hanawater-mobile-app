import Snackbar from "react-native-snackbar";
import { Colors } from "../config/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

const getSnackBarLength = {
  short: Snackbar.LENGTH_SHORT,
  long: Snackbar.LENGTH_LONG,
};

const getTextColor = {
  success: Colors.Success_text,
  error: Colors.Error_text,
};

const getBgColor = {
  success: Colors.Toast_success,
  error: Colors.Toast_error,
};

export const mergeCart = (cart, payload) => {
  let data = [...cart];
  if (cart.length === 0) {
    data.push({ ...payload });
    return [{ ...payload }];
  } else if (payload?.showMosque) {
    let ind = cart.findIndex((val) => {
      return val?.showItem;
    });

    let indsubscription = cart.findIndex((val) => {
      return val?.subscription;
    });
    // console.log("indind", ind);

    if (ind > -1 || indsubscription > -1) {
      data.splice(found, data.length);

      const found = data.findIndex(
        (c) =>
          (c.id || c.itemId || c.productId) ==
          (payload.id || payload.productId || payload.itemId)
      );
      // console.log("foundfound", found);
      if (found !== -1) {
        if (payload.quantity === 0) {
          data.splice(found, 1);
        } else {
          data[found] = {
            ...data[found],
            quantity: payload.quantity,
          };
        }
      } else {
        data.push({ ...payload });
      }
    } else {
      const found = data.findIndex(
        (c) =>
          (c.id || c.itemId || c.productId) ==
          (payload.id || payload.productId || payload.itemId)
      );
      console.log("foundfound", found);
      if (found !== -1) {
        if (payload.quantity === 0) {
          data.splice(found, 1);
        } else {
          data[found] = {
            ...data[found],
            quantity: payload.quantity,
          };
        }
      } else {
        data.push({ ...payload });
      }
    }
  } else if (payload?.showItem) {
    let ind = cart.findIndex((val) => {
      return val?.showMosque;
    });
    let indSubscription = cart.findIndex((val) => {
      return val?.subscription;
    });
    console.log("indind", ind);
    if (ind > -1 || indSubscription > -1) {
      // data = [];
      // data.push({ ...payload });
      data.splice(found, data.length);
      // data = [...cart];

      const found = data.findIndex(
        (c) =>
          (c.id || c.itemId || c.productId) ==
          (payload.id || payload.productId || payload.itemId)
      );
      console.log("foundfound", found);
      if (found !== -1) {
        if (payload.quantity === 0) {
          data.splice(found, 1);
        } else {
          data[found] = {
            ...data[found],
            quantity: payload.quantity,
          };
        }
      } else {
        data.push({ ...payload });
      }
    } else {
      const found = data.findIndex(
        (c) =>
          (c.id || c.itemId || c.productId) ==
          (payload.id || payload.productId || payload.itemId)
      );
      console.log("foundfound", found);
      if (found !== -1) {
        if (payload.quantity === 0) {
          data.splice(found, 1);
        } else {
          data[found] = {
            ...data[found],
            quantity: payload.quantity,
          };
        }
      } else {
        data.push({ ...payload });
      }
    }
  } else if (payload?.subscription) {
    let ind = cart.findIndex((val) => {
      return val?.showItem;
    });

    let indsubscription = cart.findIndex((val) => {
      return val?.showMosque;
    });
    console.log("indind", ind);

    if (ind > -1 || indsubscription > -1) {
      data.splice(found, data.length);

      const found = data.findIndex(
        (c) =>
          (c.id || c.itemId || c.productId) ==
          (payload.id || payload.productId || payload.itemId)
      );
      console.log("foundfound", found);
      if (found !== -1) {
        if (payload.quantity === 0) {
          data.splice(found, 1);
        } else {
          data[found] = {
            ...data[found],
            quantity: payload.quantity,
          };
        }
      } else {
        data.push({ ...payload });
      }
    } else {
      const found = data.findIndex(
        (c) =>
          (c.id || c.itemId || c.productId) ==
          (payload.id || payload.productId || payload.itemId)
      );
      console.log("foundfound", found);
      if (found !== -1) {
        // if (payload.quantity === 0) {
        data.splice(found, 1);
        // } else {
        //   data[found] = {
        //     ...data[found],
        //     quantity: payload.quantity,
        //   };
        // }
      } else {
        data.push({ ...payload });
      }
    }
  } else {
    const found = cart.findIndex(
      (c) =>
        (c.id || c.itemId || c.productId) ==
        (payload.id || payload.productId || payload.itemId)
    );
    if (found !== -1) {
      if (payload.quantity === 0) {
        data.splice(found, 1);
      } else {
        data[found] = {
          ...data[found],
          quantity: payload.quantity,
        };
      }
    } else {
      data.push({ ...payload });
    }
    // console.log("data", data);
  }
  console.log("mergeCart", data);

  return data;
};

export const _mergeCartOrders = (arr1, arr2) => {
  arr2.map((item) => {
    let index = _.findIndex(
      arr1,
      (i) => (i.id || i.productId) === item.productId
    );

    if (index > -1) {
      arr1[index].quantity += item.quantity;
    } else {
      arr1.push(item);
    }
  });

  return arr1;
};

export const showToast = ({
  text = "",
  type = "error",
  duration = "short",
  action = null,
}) => {
  Snackbar.show({
    text,
    duration: getSnackBarLength[duration],
    numberOfLines: 1,
    textColor: getTextColor[type],
    backgroundColor: getBgColor[type],
    action: action && {
      text: action.text,
      textColor: action.textColor || Colors.Info_text,
      onPress: action.onPress,
    },
  });
};

export const setItem = async (key, value) =>
  await AsyncStorage.setItem(key, value);

export const getItem = async (key) => await AsyncStorage.getItem(key);

export const removeItem = async (key) => await AsyncStorage.removeItem(key);

export const clearAll = async () => await AsyncStorage.clear();

export const CONSTANTS = {
  EN: "en",
  AR: "ar",
  LANG: "lang",
};
