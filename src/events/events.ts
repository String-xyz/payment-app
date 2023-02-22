const CHANNEL = "STRING_PAY";
export interface StringEvent<T = any> {
	eventName: string;
	data?: T;
	error?: any;
}

export enum Events {
	IFRAME_READY = 'ready',
	SUBMIT_CARD	= 'submit_card',
	CARD_TOKENIZED = 'card_tokenized',
	CARD_VENDOR_CHANGED = 'card_vendor_changed',
	CARD_VALIDATION_CHANGED= 'card_validation_changed'
};

export const sendEvent = (eventName: string, data?: any) => {
	const message = JSON.stringify({
		channel: CHANNEL,
		event: { eventName, data },
	});

	window.parent.postMessage(message, '*');
};

export const registerEvents = async () => {
	const eventHandler = async (e: any) => {
		// Filter Checkout events
		// we are already handling checkout events
		if (e.data?.type == "cko-msg") return;

		try {
			const payload = JSON.parse(e.data);
			const event = payload.event
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
