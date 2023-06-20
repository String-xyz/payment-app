export const unityStyle = {
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
};

export const webStyle = {
  PCIInnerElements: {
    base: {
      color: "#0C1116",
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
      color: "#3C5370",
    },
    invalid: {
      color: "#3C5370",
    },
    placeholder: {
      base: {
        color: "#3C5370",
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

  inputLabel: "block text-sm font-medium mb-1 text-[#3C5370]",

  PCIInputWrapper: `text-sm text-[#0C1116] 
          bg-transparent border rounded leading-5 py-2 px-3 
          focus:outline-none focus:border-gray-300
          hover:border-gray-300
          border-[#D8DDE2] h-10 shadow-sm`,

  nonePCIInputWrapper: `text-sm text-[#0C1116] 
          bg-transparent border rounded leading-5 py-2 px-3 
          focus:outline-none focus:border-gray-300 
          border-[#D8DDE2] hover:border-gray-300
          h-10 shadow-sm placeholder-black w-full`,

  error: `text-red-500 outline outline-1 
    min-h-8 h-auto outline-rose-500 rounded m-1 
    bg-rose-200 p-2 text-xs w-auto md:w-6/12 
    lg:w-3/12`,
};
