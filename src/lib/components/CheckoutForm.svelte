<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import CheckoutInput from './CheckoutInput.svelte';
  import { cardNumberValid, expiryValid, cvvValid, updateValidation, cardholder,cardholderValid, styles } from '../store';
  
  const dispatch = createEventDispatcher();
  
  onMount(() => {
    // we need to wait for the frames to be ready before we can initialize them
    dispatch('ready');
  });

</script>

<div class={$styles.container}>
    <div>
      <div class={$styles.spacer}>
        <!-- Name on Card -->
        <CheckoutInput elementId="card-name" frameName="card-name" labelName="Name on card" valid={$cardholderValid} cardholder={$cardholder} />
        <!-- Card Number -->
        <CheckoutInput elementId="card-number" frameName="card-number-frame" labelName="Card number" valid={$cardNumberValid} />
          <div class={$styles.CVVExpiryContainer}>
            <!-- Expiry -->
            <CheckoutInput elementId="card-expiry" frameName="expiry-date-frame" labelName="Expiration date" valid={$expiryValid}/>
            <!-- CVC -->
            <CheckoutInput elementId="card-cvv" frameName="cvv-frame" labelName="Security code" valid={$cvvValid} />
          </div>
      </div>
    </div>
</div>
