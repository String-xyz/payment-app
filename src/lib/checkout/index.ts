import { get } from "svelte/store";
import { environment, styles } from "../store";

const DEV_PUBLIC_KEY = import.meta.env.VITE_DEV_CHECKOUT_PUBLIC_KEY;
const PROD_PUBLIC_KEY = import.meta.env.VITE_PROD_CHECKOUT_PUBLIC_KEY;

export const checkout = window.Frames;

const getCheckoutKey = () => {
  if (get(environment) === "prod") {
    return PROD_PUBLIC_KEY;
  } else {
    return DEV_PUBLIC_KEY;
  }
};

export const submitCard = (cardholder: string) => {
  checkout.cardholder = cardholder;
  checkout.submitCard();
  checkout.enableSubmitForm();
};

export const initCheckout = (style: any) => {
  checkout.init({
    publicKey: getCheckoutKey(),
    style,
    acceptedPaymentMethods: [
      "Visa",
      "Mastercard",
      "American Express",
      "Discover",
    ],
    localization: {
      cardNumberPlaceholder: "1234 5678 1234 5678",
      expiryMonthPlaceholder: "MM",
      expiryYearPlaceholder: "YY",
      cvvPlaceholder: "CVV",
    },
  });
};

export const setStyle = (style: any) => {
  styles.set(style);
  initCheckout(style.PCIInnerElements);
};
