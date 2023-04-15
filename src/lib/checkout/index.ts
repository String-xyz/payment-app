const PUBLIC_KEY = <string>import.meta.env.VITE_CHECKOUT_PUBLIC_KEY;

// @ts-ignore
export const checkout = window.Frames;

export const submitCard = (cardholder: string) => {
  // @ts-ignore
  checkout.cardholder = cardholder;
  checkout.submitCard();
  checkout.enableSubmitForm();
}

export const initCheckout = (style: any) => {
  // @ts-ignore
  checkout.init({
    publicKey: PUBLIC_KEY,
    style,
    localization: {
    cardNumberPlaceholder: '1234 5678 1234 5678',
    expiryMonthPlaceholder: 'MM',
    expiryYearPlaceholder: 'YY',
    cvvPlaceholder: 'CVV',
    }
  });
}
