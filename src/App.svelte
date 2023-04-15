<script lang="ts">
  import CheckoutForm from './lib/components/CheckoutForm.svelte';
  import { registerForEvents, registerCheckoutEvents } from './lib/events';
  import { onMount } from 'svelte';
  import { defaultStyle } from './resetStyle.ts';
  import { initCheckout } from './lib/checkout';

  // initialize checkout when frames are ready
  const framesLoaded = (event) => {
    initCheckout(defaultStyle);
  }

  onMount(() => {
    registerCheckoutEvents();
    registerForEvents();
  });

</script>

<main>
  <CheckoutForm on:ready={framesLoaded}/>
</main>
