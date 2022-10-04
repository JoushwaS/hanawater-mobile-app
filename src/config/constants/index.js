const Endpoints = {
  GET_PROMOTIONS: "/v1/promotion?isActive=1",
  GET_PRODUCTS: "/v1/product?isActive=1",
  GET_MOSQUE: "/v1/mosque?isActive=1",
  GET_SUBSCRIPTIONS: "/v1/subscription-option?isActive=1",
  CUSTOMER: "/v1/customer",
  ADD_PROMOTION_CART: "/v1/promotion/add_cart/",
  GET_CART_TOTAL: "/v1/cart/calculate_total",
  ADD_CART_BULK: "/v1/cart/add_bulk",

  LOGIN_USER: "/v2/customer/signin",
  VERIFY_OTP: "/v1/customer/otp",
  ADD_ADDRESS: "/v1/address",
  REFRESH_TOKEN: "/v1/oauth/refresh",
  CUSTOMER_PRODUCT: "/v1/product/customer",
  ORDER_STATUS: "/v1/order/customer/status",
  GET_TERMS: "/v1/misc/term-conditions",

  REORDER: "/v1/order/repeat_order",
  SUBMIT_RATING: "/v1/order-rating/create/customer-rating",
  PLACE_ORDER: "/v1/order",
  GETORDERS: "/v1/order",
  GETORDERDETAIL: "/v1/order/customer",
  GET_ORDER_RATING: "/v1/order-rating/view/customer-rating",
  RATE_ORDER: "/api/v1/order-rating/create/customer-rating",

  MISC_PAYMENT_URL_PAGE: "/v1/payment/pgurl",
  APPLY_COUPON: "/v1/cart/apply-coupon",
  MISC_PAYMENT_URL: "/v1/payment/request-checkout",
  MISC_CITIES: "/v1/misc/cities",
  CUSTOMER_PROFILE: "/v1/customer-profile",
};

export const ORDER_STATUS_NEW = "Submitted";
export const ORDER_STATUS_CANCELLED = "Cancelled";
export const ORDER_STATUS_PROGRESS = "In Progress";
export const ORDER_STATUS_ONROUTE = "Accepted";
export const ORDER_STATUS_RESCHEDULE = "Reschedule";
export const ORDER_STATUS_DELIVERED = "Delivered";
export const ORDER_STATUS_PENDING = "Pending";

export const CURRENCY_PREFIX = "SR ";

export const REPEAT_ORDER_STATUS_1 = "no_schedule";
export const REPEAT_ORDER_STATUS_2 = "reorder_now";
export const REPEAT_ORDER_STATUS_3 = "reorder_every_day";
export const REPEAT_ORDER_STATUS_4 = "reorder_every_week";
export const REPEAT_ORDER_STATUS_5 = "reorder_every_month";
export const REPEAT_ORDER_STATUS_6 = "reorder_every_3_month";

export const PAYMENT_METHOD_CREDIT_CARD = "credit_card";
export const PAYMENT_METHOD_COD = "cod";
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export { Endpoints };
