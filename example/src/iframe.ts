export function setupIframe(element: HTMLDivElement) {
  let iframe = document.createElement('iframe');
  const handleEvent = (e: any) => {
    console.log("event recieved from iframe", e)
    const payload = JSON.parse(e.data);
			const event = payload.event
      if (payload.channel == "STRING_PAY" && event.eventName == "ready") {
          sendEvent(iframe);
			}
  }

  iframe.src = " http://localhost:8081/"
  iframe.style.width = '400px'
  iframe.style.height = '500px'
  element.appendChild(iframe);
  window.addEventListener('message', handleEvent);
}

const sendEvent = (iframe:HTMLIFrameElement) => { 
  const message = JSON.stringify({
    channel:"STRING_PAY",
    event: { eventName: "init_iframe"}
  });
  iframe.contentWindow?.postMessage(message, '*')
}