import { Events, sendEvent } from './events';

const OnValidationChanged = (e: any) => {
	sendEvent(Events.CARD_VALIDATION_CHANGED,{valid: e.isValid})
};

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

export { OnValidationChanged,onCardSubmitted, onVendorChanged, onCardTokenized}