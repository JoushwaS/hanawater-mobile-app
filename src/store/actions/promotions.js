import { SET_PROMOTIONS } from "../types";
import { toggleLoader, setTermsData } from "./common";
import {
  setProductsData,
  setMosqueData,
  setSubscriptionData,
} from "./products";
import {
  getPromotionsList,
  addPromotionInCart,
  getTerms,
} from "../../config/api/promotions";
import {
  getProductsList,
  getMosqueList,
  getSubscriptionList,
} from "../../config/api/products";
import { showToast } from "../../utils/index";
import { _mergeCart } from "./cart";

const getHomeData = (payload) => async (dispatch) => {
  try {
    dispatch(toggleLoader(true));
    // const { data: promoData } = await getPromotionsList();
    const { data: productsData } = await getProductsList();
    const { data: mosqueData } = await getMosqueList();
    const { data: subscriptionData } = await getSubscriptionList();
    const { data: termsData } = await getTerms();
    const sorted = mosqueData?.data.sort((a, b) =>
      a.MosqueLanguages[0]?.name.localeCompare(b.MosqueLanguages[0]?.name)
    );
    // console.log("mosqueData?.data", mosqueData?.data);
    // dispatch(setPromotionsData(promoData?.data));
    dispatch(setProductsData(productsData?.data));
    dispatch(setMosqueData(sorted));
    dispatch(setSubscriptionData(subscriptionData?.data));
    dispatch(setTermsData(termsData.data.value));
    dispatch(toggleLoader(false));

    // await setItem("terms", termsData.data.value);
  } catch (error) {
    console.log("error", error.message);
    dispatch(toggleLoader(false));
    // showToast({
    //   text: error?.response?.data?.message || error.message,
    //   type: "error",
    // });
  }
};

const setPromotionsData = (payload) => {
  return {
    type: SET_PROMOTIONS,
    payload,
  };
};

const addPromotionToCart = (id, PromotionTypeId) => async (dispatch) => {
  try {
    const { data: cartData } = await addPromotionInCart(id, PromotionTypeId);
    // console.log("cartData", cartData);
    cartData.data[0].PromotionTypeId = PromotionTypeId;
    dispatch(_mergeCart(cartData.data));
    if (cartData.error) {
      showToast({
        text: cartData?.message || error.message,
        type: "error",
      });
    }
  } catch (error) {
    showToast({
      text: error?.response?.data?.message || error.message,
      type: "error",
    });
    // dispatch(toggleLoader(false));
  }
};

export { getHomeData, setPromotionsData, addPromotionToCart };
