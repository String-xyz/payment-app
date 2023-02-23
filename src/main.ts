import { Events, sendEvent, ckoEvents, CHANNEL } from './events';
import { defaultStyle } from './styles/style';
const CHECKOUT_PK = "pk_test_8ac41c0d-fbcc-4ae3-a771-31ea533a2beb";
let checkout: any;

export const start = async () => {
	registerEvents();
	console.info("iframe started");
	sendEvent(Events.IFRAME_READY);
}

export const registerEvents = async () => {
	const eventHandler = async (e: any) => {
		console.info("event recieved on iframe", e)
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
	if (window.frames) {
		// @ts-ignore
		window.Frames.submitCard();
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

	//sendEvent(Events.IFRAME_READY);
}

start();