export const CHANNEL = "STRING_PAY";
export interface StringEvent<T = any> {
	eventName: string;
	data?: T;
	error?: any;
}

export enum Events {
	INIT_IFRAME = 'init_iframe',
	IFRAME_LOADED ='iframe_loaded',
	IFRAME_READY = 'iframe_ready',
	SUBMIT_CARD	= 'submit_card',
	CARD_SUBMITTED = 'card_submitted',
	CARD_TOKENIZED = 'card_tokenized',
	CARD_TOKENIZE_FAILED = 'card_tokenize_failed',
	CARD_VENDOR_CHANGED = 'card_vendor_changed',
	CARD_VALIDATION_CHANGED= 'card_validation_changed'
};

export const sendEvent = (eventName: string, data?: any) => {
	const message = JSON.stringify({
		channel: CHANNEL,
		event: { eventName, data },
	});
	console.info("sending event", message)
	window.parent.postMessage(message, '*');
};