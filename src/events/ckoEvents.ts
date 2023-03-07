import { Events, sendEvent } from './events';

const onValidationChanged = (e: any) => {
	sendEvent(Events.CARD_VALIDATION_CHANGED,{valid: e.isValid})
};

const onCardTokenizationFailed = (e: any) => { 
  sendEvent(Events.CARD_TOKENIZE_FAILED, e);
}

const onVendorChanged = (e: any) => {
	sendEvent(Events.CARD_VENDOR_CHANGED, {cardVendor: e.paymentMethod, accepted: e.isPaymentMethodAccepted})
}

const onCardSubmitted = async () => {
	sendEvent(Events.CARD_SUBMITTED)
};

const onCardTokenized = async (e: any) => {
	const data = { token: e.token, scheme: e.scheme, last4: e.last4 }
	sendEvent(Events.CARD_TOKENIZED,data)
};

export { onValidationChanged,onCardSubmitted, onVendorChanged, onCardTokenized, onCardTokenizationFailed}
