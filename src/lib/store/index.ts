import { writable } from "svelte/store";
import {setStyleApp} from "./style";

export const cardholderValid = writable(true);
export const cardNumberValid = writable(true);
export const expiryValid = writable(true);
export const cvvValid = writable(true);
export const cardValid = writable(false);
export const framesLoaded = writable(false);
export const cardholder = writable("");
export const environment = writable("sandbox");
export const appType = writable("unity");
export * from "./style";

export const updateValidation = ({ cardNumber, cvv, expiryDate }) => {
  cardNumberValid.set(cardNumber);
  cvvValid.set(cvv);
  expiryValid.set(expiryDate);
};

export const updateOneValidation = ({ element, isValid, isEmpty }) => {
  if (element === "card-number") {
    if (isEmpty) {
      cardNumberValid.set(true);
      return;
    }
    cardNumberValid.set(isValid);
  }

  if (element === "cvv") {
    if (isEmpty) {
      cvvValid.set(true);
      return;
    }
    cvvValid.set(isValid);
  }

  if (element === "expiry-date") {
    if (isEmpty) {
      expiryValid.set(true);
      return;
    }

    expiryValid.set(isValid);
  }
};

export const setAppType = (app:string) => {
  appType.set(app);
  setStyleApp(app);
};
