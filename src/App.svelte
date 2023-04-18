<script lang="ts">
  import CheckoutForm from './lib/components/CheckoutForm.svelte';
  import { registerForEvents, registerCheckoutEvents, sendEvent, Events } from './lib/events';
  import { onMount } from 'svelte';
  import { defaultStyle } from './resetStyle.ts';
  import { initCheckout } from './lib/checkout';
  import { getFingerprintData } from './lib/services';

  // initialize checkout when frames are ready
  const framesLoaded = (event) => {
    initCheckout(defaultStyle);
  }

  onMount(async () => {
    registerCheckoutEvents();
    registerForEvents();
    const fingerprint = await getFingerprintData();
    sendEvent(Events.FINGERPRINT, fingerprint);
  });

</script>

<main>
  <CheckoutForm on:ready={framesLoaded}/>
</main>
