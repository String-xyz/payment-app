import { writable } from "svelte/store";
import {webStyle, unityStyle} from "../../resetStyle";

export const setStyleApp = (app: string) => {
  if (app === "web") { 
   styles.set(webStyle); 
  }
  else if (app === "unity") {
    styles.set(unityStyle);
  }
};

export const styles = writable({
  PCIInnerElements: {
    base: {
      color: "white",
      fontSize: "15px",
    },
    autofill: {
      backgroundColor: "none",
    },
    hover: {
      color: "none",
    },
    focus: {
      color: "none",
    },
    valid: {
      color: "white",
    },
    invalid: {
      color: "white",
    },
    placeholder: {
      base: {
        color: "white",
      },
      focus: {
        border: "none",
      },
    },
  },

  container: "h-full w-full mt-10 px-8 pb-6",

  spacer: "space-y-4",

  CVVExpiryContainer: "flex flex-row gap-x-5",

  inputContainer: "basis-1/2",

  inputLabel: "block text-sm font-medium mb-1 text-white",

  PCIInputWrapper: `text-sm text-white 
          bg-transparent border rounded leading-5 py-2 px-3 
          focus:outline-none focus:border-gray-300
          hover:border-gray-300
          border-gray-200 h-10 shadow-sm`,

  nonePCIInputWrapper: `text-sm text-white 
          bg-transparent border rounded leading-5 py-2 px-3 
          focus:outline-none focus:border-gray-300 
          border-gray-200 hover:border-gray-300
          h-10 shadow-sm placeholder-white w-full`,

  error: `text-red-500 outline outline-1 
    min-h-8 h-auto outline-rose-500 rounded m-1 
    bg-rose-200 p-2 text-xs w-auto md:w-6/12 
    lg:w-3/12`,
});
