import _ from "lodash";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_NEW,
  ORDER_STATUS_ONROUTE,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_RESCHEDULE,
} from "../config/constants";

import { Platform } from "react-native";
export const getLanguage = (code) => {
  return code === "en" ? 1 : 2;
};

export const isEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
export const fetchTotalOrderHistory = (totals) => {
  let totalObj = {};
  totals.map((total) => {
    totalObj = {
      ...totalObj,
      [total.title]: total.value,
    };
  });

  return totalObj;
};
export const mergeCart = (arr1, arr2) => {
  arr2.map((item) => {
    let index = _.findIndex(arr1, (i) => i.productId === item.productId);

    if (index > -1) {
      arr1[index].quantity += item.quantity;
    } else {
      arr1.push(item);
    }
  });

  return arr1;
};

export const getOrderStatusColor = (orderStatus) => {
  switch (orderStatus) {
    case ORDER_STATUS_NEW:
      return colors.success;
    case ORDER_STATUS_CANCELLED:
      return colors.red;
    case ORDER_STATUS_ONROUTE:
      return colors.success;
    case ORDER_STATUS_RESCHEDULE:
      return colors.primary;
    case ORDER_STATUS_DELIVERED:
      return colors.primary;
    case ORDER_STATUS_PENDING:
      return colors.warning;
  }
};

export const dateFormat = (date) => {
  let d = new Date(date);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
};

export const getTranslationOrderStatus = (status) => {
  return "order_status_" + status.toLowerCase().replace(" ", "_");
};

export const getTranslationPaymentMethod = (method) => {
  return "payment_method_" + method.toLowerCase().replace(" ", "_");
};

export const getItems = (arr, n = 0) => {
  let resultant = [];
  arr.map((data, index) => {
    index = index + 1;
    if (index <= n) {
      resultant.push(data);
    }
  });

  return resultant;
};

export const isAndroid = () => {
  return Platform.OS === "android";
};

export const isIOS = () => {
  return Platform.OS === "ios";
};
