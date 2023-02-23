import { Events, sendEvent, ckoEvents, CHANNEL } from './events';
import { defaultStyle } from './styles/style';
const CHECKOUT_PK = import.meta.env.VITE_CHECKOUT_PUBLIC_KEY; 
let checkout: any;

export const start =  () => {
	registerEvents();
	sendEvent(Events.IFRAME_LOADED);
}

export const registerEvents =  () => {
	const eventHandler = (e: any) => {
		// Filter Metamask events
		if (e.data?.data?.name) return;
		// we are already handling checkout events through registed callbacks
		if (e.data?.type == "cko-msg") return;

		try {
			const payload = JSON.parse(e.data);
			const event = payload.event
			if (payload.channel == CHANNEL && event.eventName == Events.INIT_IFRAME) {
				init(payload.event.data);
			}
			if (payload.channel == CHANNEL && event.eventName == Events.SUBMIT_CARD) {
				submitCard();
			}
		} catch (error) {
			console.error(error);
		}
	}
	
	window.removeEventListener('message', eventHandler, true);
	window.addEventListener('message', eventHandler, true);
}

const submitCard = () => {
	// @ts-ignore
	if (window.Frames) {
		// @ts-ignore
		window.Frames.submitCard();
	} else { 
	//TODO maybe notify that theres no iframe loaded
	}
}

const init = (style: any = defaultStyle) => {
	// @ts-ignore
	checkout = window.Frames;
	checkout.init({
		publicKey: CHECKOUT_PK,
		acceptedPaymentMethods: ["Visa", "Mastercard", "American Express", "Discover"],
		cardTokenized: ckoEvents.onCardTokenized,
		cardValidationChanged: ckoEvents.validateInfo,
		paymentMethodChanged: ckoEvents.onVendorChanged,
		style: style
	});

	sendEvent(Events.IFRAME_READY);
}

start();