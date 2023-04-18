<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import CheckoutInput from './CheckoutInput.svelte';
  import { cardNumberValid, expiryValid, cvvValid, updateValidation, cardholder } from '../store';
  
  const dispatch = createEventDispatcher();
  
  onMount(() => {
    // we need to wait for the frames to be ready before we can initialize them
    dispatch('ready');
  });

</script>

<div class="h-full w-full mt-10">
  <div class="px-8 pb-6">
    <div>
      <div class="space-y-4">
        <!-- Name on Card -->
        <div>
          <label class="block text-sm mb-1 text-white" for="card-name">Name on Card</label>
          <input id="card-name" class="text-sm text-white
          bg-transparent border rounded leading-5 py-2 px-3 focus:outline-none focus:border-gray-300
          border-gray-200 hover:border-gray-300
          shadow-sm placeholder-white w-full"
          type="text" placeholder="Name on card" bind:value={$cardholder} />
        </div>
        <!-- Card Number -->
        <CheckoutInput elementId="card-number" frameName="card-number-frame" labelName="Card number" valid={$cardNumberValid} />
          <div class="flex flex-row gap-x-5">
            <!-- Expiry -->
            <CheckoutInput elementId="card-expiry" frameName="expiry-date-frame" labelName="Expiration date" valid={$expiryValid}/>
            <!-- CVC -->
            <CheckoutInput elementId="card-cvv" frameName="cvv-frame" labelName="Security code" valid={$cvvValid} />
          </div>
      </div>
    </div>
  </div>
</div>
