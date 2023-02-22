import { Events, sendEvent, registerEvents, ckoEvents } from './events';
import template from './templates/form.html?raw';
const CHECKOUT_PK = "pk_test_8ac41c0d-fbcc-4ae3-a771-31ea533a2beb";
let checkout: any;

export const start = async () => {
	createSampleDom();
	await registerEvents();
	// @ts-ignore
	checkout = window.Frames;
	checkout.init({
		publicKey: CHECKOUT_PK,
		acceptedPaymentMethods: ["Visa", "Mastercard", "American Express", "Discover"],
		cardTokenized: ckoEvents.onCardTokenized,
		cardValidationChanged: ckoEvents.validateInfo,
		paymentMethodChanged: ckoEvents.onVendorChanged
	});
	
	sendEvent(Events.IFRAME_READY);
}

const createSampleDom = () => { 
	const form = document.createElement("div");
	form.innerHTML = template as string; 
	document.body.append(form);
}

start();