<script lang="ts">
  import CheckoutForm from './lib/components/CheckoutForm.svelte';
  import { registerForEvents, registerCheckoutEvents, sendEvent, Events } from './lib/events';
  import { onMount } from 'svelte';
  import { initCheckout } from './lib/checkout';
  import { getFingerprintData } from './lib/services';
  import { environment, setAppType, styles } from './lib/store';

  const framesLoaded = (event) => {
    initCheckout($styles.PCIInnerElements);
    sendEvent(Events.IFRAME_LOADED, "string-payment-frame");
  }

  onMount(async () => {
    handleEnv();
    registerCheckoutEvents();
    registerForEvents();
    const fingerprint = await getFingerprintData();
    sendEvent(Events.FINGERPRINT, fingerprint);
  });

  const handleEnv = () => { 
   const params = new URLSearchParams(window.location.search);
   if (params.has("env")) {
      const env = params.get("env");
      environment.set(env);
    }
    // lets get the app type so we can render the correct module
    if (params.has("appType")) {
      const app = params.get("appType");
      setAppType(app);
    }
  }

</script>

<main>
  <CheckoutForm on:ready={framesLoaded}/>
</main>
