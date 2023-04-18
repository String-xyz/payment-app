const PUBLIC_KEY = <string>import.meta.env.VITE_CHECKOUT_PUBLIC_KEY;

export const checkout = window.Frames;

export const submitCard = (cardholder: string) => {
  checkout.cardholder = cardholder;
  checkout.submitCard();
  checkout.enableSubmitForm();
}

export const initCheckout = (style: any) => {
  checkout.init({
    publicKey: PUBLIC_KEY,
    style,
    acceptedPaymentMethods: ["Visa", "Mastercard", "American Express", "Discover"],
    localization: {
      cardNumberPlaceholder: '1234 5678 1234 5678',
      expiryMonthPlaceholder: 'MM',
      expiryYearPlaceholder: 'YY',
      cvvPlaceholder: 'CVV',
    }
  });
}

//TODO: validate style
export const setStyle = (style: any) => {
  initCheckout(style);
}

