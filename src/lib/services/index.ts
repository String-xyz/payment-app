import * as FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

const FP_API_KEY = import.meta.env.VITE_FINGERPRINT_API_KEY;

interface Visitor {
  requestId: string;
  visitorId: string;
  agent: string;
}

export const getFingerprintData = (): Promise<Visitor> => {
  return new Promise<Visitor>((resolve) => {
    const agent = FingerprintJS.load({
      apiKey: FP_API_KEY,
    });

    agent
      .then((fp) => fp.get())
      .then((result) => {
        resolve({
          requestId: result.requestId,
          visitorId: result.visitorId,
          agent: "UNITY",
        });
      });
  });
};
