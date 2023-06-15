import { get } from "svelte/store";
import { updateOneValidation, cardValid, cardholder, appType } from "../store";
import { submitCard, setStyle } from "../checkout";

export const CHANNEL = "STRING_PAY";
export interface StringEvent<T = any> {
  eventName: string;
  data?: T;
  error?: any;
}

export enum Events {
  SET_STYLE = "set_style",
  IFRAME_LOADED = "iframe_loaded",
  FINGERPRINT = "fingerprint",
  IFRAME_READY = "iframe_ready",
  SUBMIT_CARD = "submit_card",
  CARD_SUBMITTED = "card_submitted",
  CARD_TOKENIZED = "card_tokenized",
  CARD_TOKENIZE_FAILED = "card_tokenize_failed",
  CARD_VENDOR_CHANGED = "card_vendor_changed",
  CARD_VALIDATION_CHANGED = "card_validation_changed",
}

export const sendEvent = (eventName: string, data?: any) => {
  const message = JSON.stringify({
    channel: CHANNEL,
    data: { eventName, data },
  });
  // send to parent if in sdk mode
  if (get(appType) == "web") {
    window.parent.postMessage(message, "*");
    return;
  }
  // send to unity if in unity mode which is the default
  if (window.vuplex) {
    window.vuplex.postMessage(message);
  }
};

export const registerCheckoutEvents = () => {
  window.Frames.addEventHandler(
    window.Frames.Events.CARD_VALIDATION_CHANGED,
    (event) => {
      cardValid.set(event.isValid);
      sendEvent(Events.CARD_VALIDATION_CHANGED, event.isElementValid);
    }
  );

  window.Frames.addEventHandler(
    window.Frames.Events.CARD_TOKENIZATION_FAILED,
    (event) => {
      sendEvent(Events.CARD_TOKENIZE_FAILED, event);
    }
  );

  window.Frames.addEventHandler(
    window.Frames.Events.FRAME_VALIDATION_CHANGED,
    (event) => {
      updateOneValidation(event);
    }
  );

  window.Frames.addEventHandler(
    window.Frames.Events.CARD_TOKENIZED,
    (event) => {
      sendEvent(Events.CARD_TOKENIZED, event.token);
    }
  );
};

export const registerForEvents = () => {
  // register for event if in sdk mode
  if (get(appType) == "web") {
    window.addEventListener("message", handleEvents);
    return;
  }

  // register for unity events if in unity mode
  if (window.vuplex) {
    window.vuplex.addEventListener("message", handleEvents);
  } else {
    // vuplex is not ready yet, wait for it to be ready and then register
    window.addEventListener("vuplexready", () => {
      window.vuplex.addEventListener("message", handleEvents);
    });
  }
};

const handleEvents = (e) => {
  if (e.data?.data?.name) return;
  if (e.data?.type == "cko-msg") return;
  try {
    const payload = JSON.parse(e.data);
    const event = payload.data;

    if (payload.channel == CHANNEL && event.eventName == Events.SET_STYLE) {
      if (event.data == null) return;
      setStyle(event.data);
    }

    if (payload.channel == CHANNEL && event.eventName == Events.SUBMIT_CARD) {
      submitCard(get(cardholder));
    }
  } catch (error) {
    sendEvent("Parsing error", error);
    console.error(error);
  }
};
