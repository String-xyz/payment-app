export function setupIframe(element: HTMLDivElement) {
  let iframe = document.createElement("iframe");
  const handleEvent = (e: any) => {
    // Filter Metamask events
    if (e.data?.data?.name) return;
    // Filter Checkout events
    if (e.data?.type == "cko-msg") return;

    const payload = JSON.parse(e.data);
    const event = payload.event;
    console.info("event recieved from iframe", payload);
    if (payload.channel == "STRING_PAY" && event.eventName == "iframe_loaded") {
      sendEvent(iframe);
    }
  };

  iframe.src = "http://localhost:8081/"; // iframe needs to be running
  iframe.style.width = "400px";
  iframe.style.height = "500px";
  element.appendChild(iframe);
  window.addEventListener("message", handleEvent);
}

const sendEvent = (iframe: HTMLIFrameElement) => {
  const message = JSON.stringify({
    channel: "STRING_PAY",
    event: { eventName: "init_iframe" },
  });
  iframe.contentWindow?.postMessage(message, "*");
};
