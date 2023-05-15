<script lang="ts">
  import CheckoutForm from './lib/components/CheckoutForm.svelte';
  import { registerForEvents, registerCheckoutEvents, sendEvent, Events } from './lib/events';
  import { onMount } from 'svelte';
  import { defaultStyle } from './resetStyle.ts';
  import { initCheckout } from './lib/checkout';
  import { getFingerprintData } from './lib/services';
  import { environment } from './lib/store';
  
  // initialize checkout when frames are ready
  const framesLoaded = (event) => {
    initCheckout(defaultStyle);
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
  }

</script>

<main>
  <CheckoutForm on:ready={framesLoaded}/>
</main>
