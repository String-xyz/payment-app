import { get } from "svelte/store";
import { updateOneValidation, cardValid, cardholder } from "../store";
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

  console.info("sending event", message);
  window.parent.postMessage(message, "*");

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

export const registerForUnityEvents = () => {
  if (window.vuplex) {
    window.vuplex.addEventListener("message", handleEvents);
  } else {
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

// register for unity and parent events
export const registerForEvents = () => {
  window.addEventListener("message", handleEvents, false);
  registerForUnityEvents();
};
