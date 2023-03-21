import { Events, sendEvent, ckoEvents, CHANNEL } from './events';
import { defaultStyle } from './styles/style';
const CHECKOUT_PK = import.meta.env.VITE_CHECKOUT_PUBLIC_KEY; 
let checkout: any;

export const start =  () => {
  registerEvents();
  sendEvent(Events.IFRAME_LOADED);
}

export const registerEvents =  () => {
  window.addEventListener('message', eventHandler);
}

const eventHandler = (e: any) => {
  // Filter Metamask events
  if (e.data?.data?.name) return;
  // we are already handling checkout events through registed callbacks
  if (e.data?.type == "cko-msg") return;
  try {
    const payload = JSON.parse(e.data);
    const event = payload.data;

    if (payload.channel == CHANNEL && event.eventName == Events.INIT_IFRAME) {
      init(event.data);
    }
    if (payload.channel == CHANNEL && event.eventName == Events.SUBMIT_CARD) {
      submitCard();
    }
  } catch (error) {
    sendEvent("ERROR", error);
    console.error(error);
  }
}

const submitCard = () => {
  // @ts-ignore
  checkout.submitCard();
  checkout.enableSubmitForm();
}

const init = (style: any = defaultStyle) => {
  // @ts-ignore
  checkout = window.Frames;
  // @ts-ignore
  checkout.init(); // re-init to clear previous state
  checkout.init({
    publicKey: CHECKOUT_PK,
    acceptedPaymentMethods: ["Visa", "Mastercard", "American Express", "Discover"],
    cardSubmitted: ckoEvents.onCardSubmitted,
    cardTokenized: ckoEvents.onCardTokenized,
    cardTokenizationFailed: ckoEvents.onCardTokenizationFailed,
    cardValidationChanged: ckoEvents.onValidationChanged,
    paymentMethodChanged: ckoEvents.onVendorChanged,
    style: style
  });

  sendEvent(Events.IFRAME_READY);
}

start();
